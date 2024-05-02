"""empty message

Revision ID: 514c23423b7d
Revises: 343ac38c3707
Create Date: 2024-05-02 02:56:25.882499

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '514c23423b7d'
down_revision = '343ac38c3707'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=1024),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=1024),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    # ### end Alembic commands ###
