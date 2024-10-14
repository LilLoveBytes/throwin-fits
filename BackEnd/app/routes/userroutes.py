from app import db
from flask import Blueprint, jsonify, request, make_response
from app.models.user import User
from flask_jwt_extended import create_access_token

user_bp = Blueprint("users", __name__, url_prefix="/users")


@user_bp.route("/register", methods=["POST"])
def register_new_user():
    request_body = request.get_json()

    username = request_body.get('username')
    email = request_body.get('email')
    password = request_body.get('password')

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({'message': 'Username or email already exists'}), 400


    new_user = User(email=email, username=username)
    new_user.set_password(password)
          
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify(f"User {new_user.id} successfully created"), 201)

@user_bp.route("/login", methods=["POST"])
def login_user():
    request_body = request.get_json()
    email = request_body.get('email')
    password = request_body.get('password')

    user = User.query.filter(User.email == email).first()

    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

@user_bp.route("/<userid>", methods=["GET"])
def get_user():
    return jsonify({"message": "get user"})

@user_bp.route("/<userid>", methods=["PUT"])
def update_user():
    return jsonify({"message": "update user"})

@user_bp.route("/<userid>", methods=["DELETE"])
def delete_user():
    return jsonify({"message": "delete user"})