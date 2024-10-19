from app import db

class Garment(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  details = db.Column(db.String, nullable=True)
  image_url = db.Column(db.String, nullable=False)
  
  # category = db.Column(db.String, nullable=False)
  