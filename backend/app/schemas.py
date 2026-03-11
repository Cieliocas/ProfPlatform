from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: EmailStr
    is_verified: bool = False
    bio: Optional[str] = None
    
    location_city: Optional[str] = None
    location_state: Optional[str] = None
    location_country: Optional[str] = "Brasil"
    graduation_level: Optional[str] = None
    workplace: Optional[str] = None
    
    instagram_link: Optional[str] = None
    email_link: Optional[str] = None
    custom_link: Optional[str] = None
    
    show_location: bool = True
    show_graduation: bool = True
    show_workplace: bool = True
    show_socials: bool = True

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    location_city: Optional[str] = None
    location_state: Optional[str] = None
    location_country: Optional[str] = None
    graduation_level: Optional[str] = None
    workplace: Optional[str] = None
    instagram_link: Optional[str] = None
    email_link: Optional[str] = None
    custom_link: Optional[str] = None
    show_location: Optional[bool] = None
    show_graduation: Optional[bool] = None
    show_workplace: Optional[bool] = None
    show_socials: Optional[bool] = None

class UserPublicResponse(BaseModel):
    id: int
    name: str
    is_verified: bool = False
    bio: Optional[str] = None
    created_at: datetime
    
    location_city: Optional[str] = None
    location_state: Optional[str] = None
    location_country: Optional[str] = None
    graduation_level: Optional[str] = None
    workplace: Optional[str] = None
    
    instagram_link: Optional[str] = None
    email_link: Optional[str] = None
    custom_link: Optional[str] = None
    
    show_location: bool = True
    show_graduation: bool = True
    show_workplace: bool = True
    show_socials: bool = True
    
    class Config:
        from_attributes = True

class UserDelete(BaseModel):
    password: str

# --- Autenticação ---
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    id: Optional[int] = None

class ForgotPassword(BaseModel):
    email: EmailStr

class ResendVerification(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    token: str
    new_password: str

# --- Attachment Schemas ---
class AttachmentBase(BaseModel):
    file_name: str
    file_type: str
    file_url: str

class AttachmentResponse(AttachmentBase):
    id: int
    experience_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Experience Schemas ---
class ExperienceBase(BaseModel):
    title: str
    content: str
    classification: str
    discipline: str
    tags: List[str] = []

class ExperienceCreate(ExperienceBase):
    attachments: List[AttachmentBase] = []

class ExperienceResponse(ExperienceBase):
    id: int
    author_id: int
    upvotes: int
    created_at: datetime
    author: UserResponse
    attachments: List[AttachmentResponse] = []
    
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
