"""adds garment and garmentcategory models

Revision ID: 9606e6b50e62
Revises: 1d25672bafdf
Create Date: 2024-02-01 17:43:42.686740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9606e6b50e62'
down_revision = '1d25672bafdf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('garment',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('details', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('garment_category',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('category_name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('garment_category')
    op.drop_table('garment')
    # ### end Alembic commands ###
