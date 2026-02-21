from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: EmailStr
    bio: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Autenticação ---
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    id: Optional[int] = None

# --- Experience Schemas ---
class ExperienceBase(BaseModel):
    title: str
    content: str
    classification: str
    discipline: str
    attachments: List[str] = []
    tags: List[str] = []

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: int
    author_id: int
    upvotes: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- UESPI Book Schemas ---
class UESPIBookBase(BaseModel):
    title: str
    cover_image: Optional[str] = None
    pdf_url: str
    publication_year: int

class UESPIBookCreate(UESPIBookBase):
    pass

class UESPIBookResponse(UESPIBookBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
