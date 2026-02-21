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
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    experiences = relationship("Experience", back_populates="author")

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    content = Column(Text) # Single rich text field replacing context, step_by_step, and materials_needed
    classification = Column(String, index=True) # Plano de aula simples, Sequência didática, Experiência comum, Informação
    discipline = Column(String, index=True) # Focus on Natural Sciences
    attachments = Column(ARRAY(String), default=[]) # Store URLs for media/PDFs
    tags = Column(ARRAY(String), default=[])
    upvotes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    author = relationship("User", back_populates="experiences")

class UESPIBook(Base):
    __tablename__ = "uespi_books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    cover_image = Column(String, nullable=True) # URL for the image
    pdf_url = Column(String)
    publication_year = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
