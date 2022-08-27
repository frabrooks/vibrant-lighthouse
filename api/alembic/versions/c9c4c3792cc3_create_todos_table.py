"""create todos table

Revision ID: c9c4c3792cc3
Revises:
Create Date: 2022-04-18 14:24:01.142023

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9c4c3792cc3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('todos', sa.Column('id',
                    sa.Integer(), nullable=False, primary_key=True),
                    sa.Column('title', sa.String(), nullable=False),
                    sa.Column('important', sa.Boolean(), nullable=False),
                    sa.Column('due_soon', sa.Boolean(), nullable=False),
                    sa.Column('archived', sa.Boolean(), nullable=False))
    pass


def downgrade():
    op.drop_table('todos')
    pass
