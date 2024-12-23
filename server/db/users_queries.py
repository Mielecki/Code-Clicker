from db.database import db_connection
from sqlite3 import Error

def create_user(name, email, password):
    try:
        with db_connection() as conn:
            conn.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
        return True
    except Error as err:
        print("Error while creating a user:", err)
        return False
    
