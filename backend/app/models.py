import datetime
from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, ForeignKey, ARRAY
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    is_verified = Column(Boolean, default=False)
    bio = Column(Text, nullable=True)
    
    # Extended Profile Information
    location_city = Column(String, nullable=True)
    location_state = Column(String, nullable=True)
    location_country = Column(String, nullable=True, default="Brasil")
    graduation_level = Column(String, nullable=True)
    workplace = Column(String, nullable=True)
    
    # Social Links
    instagram_link = Column(String, nullable=True)
    email_link = Column(String, nullable=True)
    custom_link = Column(String, nullable=True)
    
    # Visibility Flags
    show_location = Column(Boolean, default=True)
    show_graduation = Column(Boolean, default=True)
    show_workplace = Column(Boolean, default=True)
    show_socials = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    experiences = relationship("Experience", back_populates="author", cascade="all, delete-orphan")

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    content = Column(Text) # Single rich text field replacing context, step_by_step, and materials_needed
    classification = Column(String, index=True) # Plano de aula simples, Sequência didática, Experiência comum, Informação
    discipline = Column(String, index=True) # Focus on Natural Sciences
    
    tags = Column(ARRAY(String), default=[])
    upvotes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    author = relationship("User", back_populates="experiences")
    attachments = relationship("Attachment", back_populates="experience", cascade="all, delete-orphan")

class Attachment(Base):
    __tablename__ = "attachments"
    
    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"))
    file_name = Column(String)
    file_type = Column(String) # docx, pdf, image, link
    file_url = Column(String) # external URL or local static path
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    experience = relationship("Experience", back_populates="attachments")

class UESPIBook(Base):
    __tablename__ = "uespi_books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    cover_image = Column(String, nullable=True) # URL for the image
    pdf_url = Column(String)
    publication_year = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
