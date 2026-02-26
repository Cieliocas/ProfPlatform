from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import FileResponse
import os
import uuid
import shutil
from pathlib import Path

router = APIRouter()

# Configuração do diretório de uploads local na pasta do backend
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Tipos permitidos
ALLOWED_EXTENSIONS = {
    "pdf", 
    "doc", "docx", 
    "xls", "xlsx",
    "png", "jpg", "jpeg", "webp",
    "txt"
}

def get_file_extension(filename: str) -> str:
    return filename.split('.')[-1].lower() if '.' in filename else ''

@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_file(file: UploadFile = File(...)):
    ext = get_file_extension(file.filename)
    
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail=f"Formato de arquivo '{ext}' não permitido. Formatos suportados: PDF, Imagens, Word, Excel, TXT."
        )
        
    # Gera um nome seguro e único
    safe_filename = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = UPLOAD_DIR / safe_filename
    
    try:
        # Salva o arquivo fisicamente
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Opcional: Aqui poderiamos retornar /api/v1/upload/{filename} 
        # Neste MVP retornaremos uma URL relativa confiável
        file_url = f"/api/v1/upload/{safe_filename}?type={ext}"
        
        return {
            "file_name": file.filename,
            "file_type": ext,
            "file_url": file_url
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro no servidor ao salvar arquivo.")

@router.get("/{filename}")
async def serve_file(filename: str):
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Arquivo não encontrado.")
    
    return FileResponse(file_path)
