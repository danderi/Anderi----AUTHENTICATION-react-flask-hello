"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta

#importación de bcrypt diferente
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import re
from sqlalchemy.orm.exc import NoResultFound
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
bcrypt = Bcrypt()
#la inicialización de JWTManager está en la carpeta app.py despues de la declaración del servidor Flask
# jwt = JWTManager()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def new_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        first_name = request.json.get('firstName')
        last_name = request.json.get('lastName')

        if not email.strip() or not first_name.strip() or not last_name.strip() or not password.strip():
            return jsonify({"message": "Missing required fields: first_name, last_name, email, password"}), 400
    
        if not email or not first_name or not last_name or not password:
            return jsonify({"message": "Missing required fields: first_name, last_name, email, password"}), 400
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        new_user = User(
            email = email,
            password = hashed_password,
            last_name = last_name,
            first_name = first_name
            )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully", "user": new_user.serialize()}), 201
    
    except NoResultFound:
        return jsonify({'error': 'User already exist.'}), 404
    
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Failed to create user", "error": str(e)}), 500


@api.route('/login', methods=['POST'])
def get_token():
    
    def validate_email(email):
        pattern = r'^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$'
        return re.match(pattern, email)
    
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format.'}), 404
        
        login_user = User.query.filter_by(email=request.json['email']).one()
        
        true_o_false = bcrypt.check_password_hash(login_user.password, password)

        if true_o_false:
            expires = timedelta(minutes=10)  # pueden ser "hours", "minutes", "days","seconds"
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({ 'access_token':access_token}), 200
        else:
            return jsonify({'error': 'Invalid password.'}), 401  # Unauthorized

    except NoResultFound:
        return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500

    

@api.route('/private', methods=['GET'])
@jwt_required()
def show_users():
    try:
        current_user_id = get_jwt_identity()  # Obtiene la id del usuario del token
        if current_user_id:
            users = User.query.all()
            user_list = [{'id': user.id, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name} for user in users]
            return jsonify(user_list), 200
        else:
            return jsonify({'error': 'Invalid token or token not provided'}), 401
    except Exception as e:
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
    
    
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_info():
    current_user_id = get_jwt_identity()  # Obtiene la id del usuario del token
    user = User.query.get(current_user_id)  # Consulta el usuario basado en la id
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_info = {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        # Añade cualquier otra información del usuario que desees retornar
    }
    
    return jsonify(user_info), 200