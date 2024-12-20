from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class Users(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String, unique=True, nullable=False)
  password = db.Column(db.String, nullable=False)

  def set_password(self, password):
    self.password = generate_password_hash(password)
  
  def check_password(self, password):
    return check_password_hash(self.password, password)