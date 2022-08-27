from sqlalchemy import Column, Integer, String, Boolean, text, TIMESTAMP
from .database import Base


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    important = Column(Boolean, nullable=False)
    due_soon = Column(Boolean, nullable=False)
    archived = Column(Boolean, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
