from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()
load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__)

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
            "SQLALCHEMY_DATABASE_URI")
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')

    jwt = JWTManager(app)

    from app.models.user import Users
    from app.models.garment import Garment
    from app.models.garmentCategory import GarmentCategory 
    
    db.init_app(app)
    migrate.init_app(app, db)
    
    from .routes.userroutes import user_bp
    app.register_blueprint(user_bp)

    from .routes.garmentroutes import garment_bp
    app.register_blueprint(garment_bp)

    from .routes.garmentCategoryRoutes import garmentCategory_bp
    app.register_blueprint(garmentCategory_bp)

    CORS(app)
    return app

if __name__ == "__main__":
    my_app = create_app()
    my_app.run(debug=True, host='0.0.0.0')