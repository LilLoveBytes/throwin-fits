from app import db

class GarmentCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # next steps: populuate the garmentCategory table with some data 
  # display categories in closet page
  # image database 