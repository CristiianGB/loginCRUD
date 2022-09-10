"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

#va a haber 3 routes uno para signup login y protected.
@api.route("/login", methods = ["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).filter_by(password=password).first()
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user_id": user.id })
        

@api.route("/signup", methods = ["POST"])
def signup():
    username = request.json.get("username", None)
    fullname = request.json.get("fullname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_already_exists = User.query.filter_by(username=username).filter_by(email=email).first()
    if user_already_exists : 
        return jsonify({"msg" : "mismo usuario o email"}), 401
    else: 
        new_user = User( username=username, fullname=fullname, email=email, password= password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"user":new_user.serialize()})
   
@api.route("/protected", methods=["POST"])
@jwt_required()
def token_access():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify(user.serialize()), 200


