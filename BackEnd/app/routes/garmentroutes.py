from app import db
from flask import Blueprint, jsonify, request, make_response
from app.models.garment import Garment

garment_bp = Blueprint("garments", __name__, url_prefix="/garments")

@garment_bp.route("", methods=["POST"])
def new_garment():
    request_body = request.get_json()

    user_id = request_body.get('user_id')
    details = request_body.get('details')
    image_url = request_body.get('image_url')

    new_garment = Garment(user_id=user_id, details=details, image_url=image_url)
    # error handling 
    db.session.add(new_garment)
    db.session.commit()

    return make_response(jsonify(f"Garment {new_garment.id} successfully added"), 201)

@garment_bp.route("", methods=["GET"])
def get_all_garments():
    garments = Garment.query.all()
    garments_response = []

    for garment in garments:
        garments_response.append({
            "id": garment.id,
            "user_id": garment.user_id,
            "details": garment.details,
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
        "details": garment.details,
        "image_url": garment.image_url
        })

@garment_bp.route("/<garmentid>", methods=["PATCH"])
def update_garment(garmentid):
    garment = Garment.query.get(garmentid)

    if not garment:
        return jsonify({"message": "Garment not found"}), 404
    
    request_body = request.get_json()
    garment.details = request_body.get('details', garment.details)
    garment.image_url = request_body.get('image_url', garment.image_url)

    db.session.commit()
    return jsonify({
        "id": garment.id,
        "user_id": garment.user_id,
        "details": garment.details,
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
