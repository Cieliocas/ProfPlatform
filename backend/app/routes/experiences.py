from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.database import get_db
from app.routes.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[schemas.ExperienceResponse])
def get_experiences(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    experiences = db.query(models.Experience).order_by(models.Experience.created_at.desc()).offset(skip).limit(limit).all()
    return experiences

@router.post("/", response_model=schemas.ExperienceResponse, status_code=status.HTTP_201_CREATED)
def create_experience(
    experience: schemas.ExperienceCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    new_experience = models.Experience(
        **experience.model_dump(),
        author_id=current_user.id
    )
    db.add(new_experience)
    db.commit()
    db.refresh(new_experience)
    return new_experience

@router.get("/{id}", response_model=schemas.ExperienceResponse)
def get_experience(id: int, db: Session = Depends(get_db)):
    experience = db.query(models.Experience).filter(models.Experience.id == id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

@router.put("/{id}/upvote", response_model=schemas.ExperienceResponse)
def upvote_experience(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Note: In a real app we would track who upvoted to prevent double voting
    experience = db.query(models.Experience).filter(models.Experience.id == id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    experience.upvotes += 1
    db.commit()
    db.refresh(experience)
    return experience
