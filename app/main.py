# Lib imports
from typing import List
from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Local imports
from . import models, schemas
from .database import get_db


app = FastAPI()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    return "Covey-four-quad-todo API v.1.0.0"


@app.get("/todo", status_code=status.HTTP_200_OK, response_model=List[schemas.GetTodo])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(models.Todo).all()
    return todos


@app.post("/todo", status_code=status.HTTP_201_CREATED)
def add_todos(todo: schemas.PostTodo, db: Session = Depends(get_db)):
    new_todo = models.Todo(**todo.dict())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo
