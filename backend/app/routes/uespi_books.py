from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.UESPIBookResponse])
def get_uespi_books(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    books = db.query(models.UESPIBook).order_by(models.UESPIBook.publication_year.desc()).offset(skip).limit(limit).all()
    return books

@router.post("/", response_model=schemas.UESPIBookResponse, status_code=status.HTTP_201_CREATED)
def create_uespi_book(book: schemas.UESPIBookCreate, db: Session = Depends(get_db)):
    # Note: In a real app we would restrict this to Admins
    new_book = models.UESPIBook(**book.model_dump())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@router.get("/{id}", response_model=schemas.UESPIBookResponse)
def get_uespi_book(id: int, db: Session = Depends(get_db)):
    book = db.query(models.UESPIBook).filter(models.UESPIBook.id == id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book
