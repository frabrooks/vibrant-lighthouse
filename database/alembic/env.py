from logging.config import fileConfig

import os
import sys

from sqlalchemy import engine_from_config, pool, text

from alembic import context

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from api.app.config import settings
from database.models import Base


databaseURL = (f'postgresql+psycopg2://{settings.database_username}:'
               f'{settings.database_password}@'
               f'{settings.database_hostname}:'
               f'{settings.database_port}/{settings.database_name}')

config = context.config
# Alembic uses ConfigParser under the hood, so literal '%' characters
# in passwords must be escaped before setting the URL option.
config.set_main_option("sqlalchemy.url", databaseURL.replace("%", "%%"))

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        version_table_schema=settings.database_schema,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        connect_args={"options": f"-csearch_path={settings.database_schema}"},
    )

    with connectable.connect() as connection:
        quoted_schema = connection.dialect.identifier_preparer.quote(
            settings.database_schema
        )
        connection.execute(text(f"CREATE SCHEMA IF NOT EXISTS {quoted_schema}"))
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            version_table_schema=settings.database_schema,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
