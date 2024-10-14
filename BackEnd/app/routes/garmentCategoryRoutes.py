from app import db
from flask import Blueprint, jsonify, request, make_response
from app.models.garmentCategory import GarmentCategory

garmentCategory_bp = Blueprint("garmentCategories", __name__, url_prefix="/garmentCategories")

@garmentCategory_bp.route("", methods=["POST"])
def new_garmentCategory():
    request_body = request.get_json()

    category_name = request_body.get('category_name')
    user_id = request_body.get('user_id')

    new_garmentCategory = GarmentCategory(category_name=category_name, user_id=user_id)
    # error handling 
    db.session.add(new_garmentCategory)
    db.session.commit()

    return make_response(jsonify(f"Garment Category {new_garmentCategory.id} successfully added"), 201)

@garmentCategory_bp.route("", methods=["GET"])
def get_all_garmentCategories():
    garmentCategories = GarmentCategory.query.all() #filter by user as well
    garmentCategories_response = []

    for garmentCategory in garmentCategories:
        garmentCategories_response.append({
            "id": garmentCategory.id,
            "category_name": garmentCategory.category_name,
            "user_id": garmentCategory.user_id,
        })

    return jsonify(garmentCategories_response), 200

@garmentCategory_bp.route("/<garmentCategoryid>", methods=["PATCH"])
def update_garmentCategory(garmentCategoryid):
    garmentCategory = GarmentCategory.query.get(garmentCategoryid)

    if not garmentCategory:
        return jsonify({"message": "Garment Category not found"}), 404
    
    request_body = request.get_json()
    garmentCategory.category_name = request_body.get('category_name', garmentCategory.category_name)
    garmentCategory.user_id = request_body.get('user_id', garmentCategory.user_id)
    db.session.commit()
    return jsonify(f"Garment Category {garmentCategory.id} successfully updated"), 200


@garmentCategory_bp.route("/<garmentCategoryid>", methods=["DELETE"])
def delete_garmentCategory(garmentCategoryid):
    garmentCategory = GarmentCategory.query.get(garmentCategoryid)

    if not garmentCategory:
        return jsonify({"message": "Garment Category not found"}), 404
    
    db.session.delete(garmentCategory)
    db.session.commit()
    return jsonify(f"Garment Category {garmentCategory.id} successfully deleted"), 200