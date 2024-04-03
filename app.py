from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database initialization
def initialize_database():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS todos
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, completed BOOLEAN)''')
    conn.commit()
    conn.close()

# Create
@app.route('/todo', methods=['POST'])
def create_todo():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    completed = data.get('completed', False)

    if not isinstance(completed, bool):
        return jsonify({"error": "Completed field must be a boolean"}), 400

    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)", (title, description, completed))
    conn.commit()
    conn.close()

    return jsonify({"message": "Todo created successfully"}), 201

# Read
@app.route('/todo', methods=['GET'])
def get_all_todos():
    conn = sqlite3.connect('todo.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM todos")
    rows = c.fetchall()
    conn.close()

    todos = []
    for row in rows:
        todos.append(dict(row))

    return jsonify({"todos": todos})

# Update
@app.route('/todo/<int:todo_id>', methods=['PUT', 'PATCH'])
def update_todo(todo_id):
    if request.method == 'PUT':
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        completed = data.get('completed')

        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("UPDATE todos SET title=?, description=?, completed=? WHERE id=?", (title, description, completed, todo_id))
        conn.commit()
        conn.close()
    if request.method == 'PATCH':
        data = request.get_json()
        completed = data.get('completed')

        if completed is None:
            return jsonify({"error": "Completed field is required"}), 400

        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("UPDATE todos SET completed=? WHERE id=?", (completed, todo_id))
        conn.commit()
        conn.close()

    return jsonify({"message": "Todo updated successfully"})

    return jsonify({"message": "Todo updated successfully"})

# Delete
@app.route('/todo/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("DELETE FROM todos WHERE id=?", (todo_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Todo deleted successfully"})

if __name__ == '__main__':
    initialize_database()
    app.run(debug=True, port=3100)
