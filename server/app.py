from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime

db = SQLAlchemy()

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///./codeclicker.db"
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.secret_key = os.getenv("SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=5)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = datetime.timedelta(hours=24)

    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    jwt = JWTManager(app)

    cors = CORS(app)

    from models import User
    
    bcrypt = Bcrypt(app)

    @login_manager.user_loader
    def load_user(uid):
        return User.query.get(int(uid))

    from routes import register_routes, handle_cors
    handle_cors(app)
    register_routes(app, db, bcrypt)

    migrate = Migrate(app, db)

    return app