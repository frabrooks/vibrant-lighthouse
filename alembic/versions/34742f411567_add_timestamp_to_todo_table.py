"""Add timestamp to todo table

Revision ID: 34742f411567
Revises: c9c4c3792cc3
Create Date: 2022-04-18 15:46:40.829316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34742f411567'
down_revision = 'c9c4c3792cc3'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('todos', sa.Column('created_at',
                                     sa.TIMESTAMP(timezone=True),
                                     server_default=sa.text('now()'),
                                     nullable=False))
    pass


def downgrade():
    op.drop_column('todos', 'created_at')
    pass
