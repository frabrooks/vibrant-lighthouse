from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from api.app.config import settings


SQLALCHEMY_DATABASE_URL = (f'postgresql://{settings.database_username}:'
                           f'{settings.database_password}@'
                           f'{settings.database_hostname}:'
                           f'{settings.database_port}/{settings.database_name}')

connect_args = {}

if settings.database_schema and settings.database_schema != "public":
    connect_args["options"] = f"-csearch_path={settings.database_schema}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
