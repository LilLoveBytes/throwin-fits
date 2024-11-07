from app import db
from flask import Blueprint, jsonify, request, make_response
from app.models.garment import Garment
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = '/Users/latashapollard/Developer/projects/throwin-fits/BackEnd/app/uploads'

garment_bp = Blueprint("garments", __name__, url_prefix="/garments")

@garment_bp.route("", methods=["POST"])
@jwt_required()
def new_garment():
    image = request.files['image']
    uri = request.form.get('uri')
    user_id = get_jwt_identity()
    category = request.form.get('category', 'Tops')
    # category = 'Tops'

    if not os.path.exists(UPLOAD_FOLDER): 
        os.makedirs(UPLOAD_FOLDER)
        
    file_name = secure_filename(image.name)
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    print('file path:', file_path)

    image.save(file_path)
    print('upload folder path:', UPLOAD_FOLDER)
    

    new_garment = Garment(user_id=user_id, category=category, image_url=file_path)
    # error handling 
    db.session.add(new_garment)
    db.session.commit()

    return make_response(jsonify(f"Garment {new_garment.id}  successfully added"), 201)

@garment_bp.route("", methods=["GET"])
def get_all_garments():
    garments = Garment.query.all()
    garments_response = []

    for garment in garments:
        garments_response.append({
            "id": garment.id,
            "user_id": garment.user_id,
            "category": garment.category,
            "image_url": garment.image_url
        })

    return jsonify(garments_response)

@garment_bp.route("/<garmentid>", methods=["GET"])
def get_garment(garmentid):
    garment = Garment.query.get(garmentid)

    if not garment:
        return jsonify({"message": "Garment not found"}), 404
    
    return jsonify({
        "id": garment.id,
        "user_id": garment.user_id,
        "category": garment.category,
        "image_url": garment.image_url
        })

@garment_bp.route("/<garmentid>", methods=["PATCH"])
def update_garment(garmentid):
    garment = Garment.query.get(garmentid)

    if not garment:
        return jsonify({"message": "Garment not found"}), 404
    
    request_body = request.get_json()
    garment.category = request_body.get('details', garment.category)
    garment.image_url = request_body.get('image_url', garment.image_url)

    db.session.commit()
    return jsonify({
        "id": garment.id,
        "user_id": garment.user_id,
        "category": garment.category,
        "image_url": garment.image_url
    })

@garment_bp.route("/<garmentid>", methods=["DELETE"])
def delete_garment(garmentid):
    garment = Garment.query.get(garmentid)

    if not garment:
        return jsonify({"message": "Garment not found"}), 404
    
    db.session.delete(garment)
    db.session.commit()
    return jsonify({"message": "Garment successfully deleted"})
