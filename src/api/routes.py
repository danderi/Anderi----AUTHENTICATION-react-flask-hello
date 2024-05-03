"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta

#importación de bcrypt diferente
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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

        # password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        # el password hasheado de otra manera
        hashed_password = generate_password_hash(password)


        new_user = User(
            email = email,
            password = hashed_password,
            last_name = last_name,
            first_name = first_name
            )

        db.session.add(new_user)
        db.session.commit()

        # ok_to_share = {
        #     "email": new_user.email,
        #     "full_name": new_user.first_name+" "+new_user.last_name,
        #     "id": new_user.id
        # }

        return jsonify({"message": "User created successfully", "user": new_user.serialize()}), 201
    
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Failed to create user", "error": str(e)}), 500


@api.route('/login', methods=['POST'])
def get_token():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        login_user = User.query.filter_by(email=request.json['email']).one()

        if not login_user:
            return jsonify({'error': 'Invalid email.'}), 404

        password_from_db = login_user.password
        hashed_password_hex = password_from_db
        hashed_password_bin = bytes.fromhex(hashed_password_hex[2:])

        true_o_false = check_password_hash(hashed_password_bin, password)
        
        # Si es verdadero generamos un token y lo devuelve en una respuesta JSON:
        if true_o_false:
            expires = timedelta(days=1)  # pueden ser "hours", "minutes", "days","seconds"
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({ 'access_token':access_token}), 200

        else:
            return {"Error":"Contraseña  incorrecta"},404
    
    except Exception as e:
        return {"Error":"El email proporcionado no corresponde a ninguno registrado: " + str(e)}, 500
    

@api.route('/private')
@jwt_required()  # Decorador para requerir autenticación con JWT
def show_users():
    current_user_id = get_jwt_identity()  # Obtiene la id del usuario del token
    if current_user_id:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                'id': user.id,
                'email': user.email
            }
            user_list.append(user_dict)
        return jsonify(user_list), 200
    else:
        return {"Error": "Token inválido o no proporcionado"}, 401