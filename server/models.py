from app import db

class User(db.Model):
    __tablename__ = "users"

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)

class Progress(db.Model):
    __tablename__ = "progress"

    uid = db.Column(
        db.Integer,
        db.ForeignKey("users.uid"),
        primary_key=True
    )
    progress_data = db.Column(db.JSON, nullable=False)
    points = db.Column(db.Integer, nullable=False)