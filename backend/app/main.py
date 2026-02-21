from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app.routes import auth, experiences, uespi_books

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ProfPlatform API",
    description="API para plataforma de compartilhamento de vivências pedagógicas",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(experiences.router, prefix="/api/v1/experiences", tags=["experiences"])
app.include_router(uespi_books.router, prefix="/api/v1/uespi-books", tags=["uespi-books"])

@app.get("/", tags=["Health Check"])
def read_root():
    return {"message": "Welcome to ProfPlatform API"}
