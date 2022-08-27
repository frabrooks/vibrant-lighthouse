from pydantic import BaseModel
from datetime import datetime


class GetTodo(BaseModel):
    id: str
    title: str
    important: bool
    due_soon: bool
    created_at: datetime

    class Config:
        orm_mode = True


class PostTodo(BaseModel):
    title: str
    important: bool
    due_soon: bool
    archived: bool

    class Config:
        orm_mode = True


class UpdateTodo(BaseModel):
    id: int
    important: bool
    due_soon: bool
    archived: bool

    class Config:
        orm_mode = True


class DeleteTodo(BaseModel):
    id: int
