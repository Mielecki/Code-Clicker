from flask import request, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

from models import User

def respond_with_error(msg, code):
    return jsonify({
        "error": msg
    }), code

def respond(json, code):
    return jsonify(json), code

def register_routes(app, db, bcrypt):
  
    @app.route("/signup", methods=["POST"])
    def signup():
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return respond_with_error("Username and password are required", 400)

        hashed_password = bcrypt.generate_password_hash(password)

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return respond_with_error("User already exists", 409)
        user = User(username=username, password=hashed_password)

        db.session.add(user)
        db.session.commit()
        return respond({
                "username": username
            }, 200)

    @app.route("/login", methods=["POST"])
    def login():
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return respond_with_error("Username and password are required", 400)

        user = User.query.filter(User.username == username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access = create_access_token(identity=str(user.uid))
            refresh = create_refresh_token(identity=str(user.uid))
            return respond({
                "username": username,
                "access_token": access,
                "refresh_token": refresh
                }, 200)
        else:
            return respond_with_error("Invalid username or password", 401)
    
    @app.route("/profile", methods=["GET"])
    @jwt_required()
    def profile():
        user = User.query.filter(User.uid == get_jwt_identity()).first()
        return respond({
            "username": user.username,
            "uid": user.uid
        }, 200)
    
    @app.route("/refresh", methods=["POST"])
    @jwt_required(refresh=True)
    def refresh():
        current_user = get_jwt_identity()
        access = create_access_token(identity=current_user)
        return respond({
            "access_token": access
        }, 200)