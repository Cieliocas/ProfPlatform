from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os

from app import models, schemas
from app.database import get_db
from app.utils.email_service import send_verification_email, send_password_reset_email

router = APIRouter()

# Security Configs
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey_for_dev_only_change_in_prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_email_token(data: dict):
    to_encode = data.copy()
    # Expira em 2 horas
    expire = datetime.utcnow() + timedelta(hours=2)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_email_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# Dependency for current user
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=int(user_id))
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.id == token_data.id).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        name=user.name, 
        email=user.email, 
        password_hash=hashed_password,
        # TODO: VOLTAR PARA FALSE QUANDO FOR LANÇAR PRO MUNDO COM DOMÍNIO COMPRADO
        # is_verified=False (Modo Apresentação de Mestrado: Liberação Total Ativa)
        is_verified=True,
        bio=user.bio
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Gerar token e enviar e-mail de verificação em background
    token = create_email_token(data={"sub": new_user.email, "type": "verification"})
    background_tasks.add_task(send_verification_email, new_user.email, new_user.name, token)
    
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Conta nao verificada. Verifique seu e-mail (ou consulte o Console/Terminal)."
        )
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.UserResponse)
def update_user_me(
    user_data: schemas.UserUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    update_data = user_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_me(
    deletion_data: schemas.UserDelete, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    if not verify_password(deletion_data.password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Senha incorreta. A conta não foi deletada.",
        )
    
    db.delete(current_user)
    db.commit()
    return None

@router.get("/confirm-email")
def confirm_email(token: str, db: Session = Depends(get_db)):
    payload = verify_email_token(token)
    if not isinstance(payload, dict) or payload.get("type") != "verification":
        raise HTTPException(status_code=400, detail="Token invalido ou expirado.")
    
    email = payload.get("sub")
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario nao encontrado.")
    
    if user.is_verified:
        return {"message": "Email ja verificado anteriormente."}
        
    user.is_verified = True
    db.commit()
    return {"message": "Email confirmado com sucesso!"}

@router.post("/resend-verification")
def resend_verification(req: schemas.ResendVerification, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email).first()
    
    if not user:
        return {"message": "Se sua conta existir e não estiver verificada, um novo e-mail foi enviado."}
        
    if user.is_verified:
        return {"message": "Conta já verificada. Você já pode fazer login."}
        
    token = create_email_token(data={"sub": user.email, "type": "verification"})
    background_tasks.add_task(send_verification_email, user.email, user.name, token)
    
    return {"message": "Se sua conta existir e não estiver verificada, um novo e-mail foi enviado."}

@router.post("/forgot-password")
def forgot_password(req: schemas.ForgotPassword, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email).first()
    if user:
        token = create_email_token(data={"sub": user.email, "type": "reset_password"})
        background_tasks.add_task(send_password_reset_email, user.email, token)
    
    # Retorna sucesso mesmo se não existir para evitar vazamento de dados de quem tem conta
    return {"message": "Se sua conta existir, as instrucoes foram enviadas para o email."}

@router.post("/reset-password")
def reset_password(req: schemas.ResetPassword, db: Session = Depends(get_db)):
    payload = verify_email_token(req.token)
    if not isinstance(payload, dict) or payload.get("type") != "reset_password":
        raise HTTPException(status_code=400, detail="Token invalido ou expirado.")
        
    email = payload.get("sub")
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario nao encontrado.")
        
    hashed_password = get_password_hash(req.new_password)
    user.password_hash = hashed_password
    db.commit()
    return {"message": "Senha modificada com sucesso."}

@router.get("/{user_id}", response_model=schemas.UserPublicResponse)
def read_user_public(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    # Aplica lógica de visibilidade (apenas retorna None para campos privados na Serialização Pública)
    public_user = schemas.UserPublicResponse.model_validate(user)
    
    if not user.show_location:
        public_user.location_city = None
        public_user.location_state = None
        public_user.location_country = None
        
    if not user.show_graduation:
        public_user.graduation_level = None
        
    if not user.show_workplace:
        public_user.workplace = None
        
    if not user.show_socials:
        public_user.instagram_link = None
        public_user.email_link = None
        public_user.custom_link = None
        
    return public_user
