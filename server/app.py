from flask import Flask, request, jsonify
from db.users_queries import create_user

app = Flask(__name__)

@app.route("/users", methods=["POST"])
def sign_up():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    print(name, email, password)
    if not name or not email or not password:
        return jsonify({
            "error": "Error while decoding data"
        }), 400
    

    if create_user(name, email, password):
        return jsonify({
            "name": name,
            "email": email
            }), 200
    else:
        return jsonify({
            "error": "Error while creating user"
        }), 400

app.run(port=5000)