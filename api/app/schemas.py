from pydantic import BaseModel, ConfigDict
from datetime import datetime


class GetTodo(BaseModel):
    id: int
    title: str
    important: bool
    due_soon: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PostTodo(BaseModel):
    title: str
    important: bool
    due_soon: bool
    archived: bool


class UpdateTodo(BaseModel):
    id: int
    important: bool
    due_soon: bool
    archived: bool


class DeleteTodo(BaseModel):
    id: int
