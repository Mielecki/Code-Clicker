import sqlite3


def db_connection():
    connection = None

    try:
        connection = sqlite3.connect('db/code_clicker.db')
    except sqlite3.Error as err:
        print("Error while connecting to SQLite database:", err)

    return connection


def create_db():
    with db_connection() as conn:
        create_users_table_query = ('''
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        ''')

        conn.execute(create_users_table_query)


if __name__ == "__main__":
    create_db()