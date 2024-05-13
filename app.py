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
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, task TEXT)''')
    conn.commit()
    conn.close()

# Create
@app.route('/todo', methods=['POST'])
def create_todo():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    task = data.get('task', 'todo')

    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("INSERT INTO todos (title, description, task) VALUES (?, ?, ?)", (title, description, task))
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
        task = data.get('task')

        conn = sqlite3.connect('todo1.db')
        c = conn.cursor()
        c.execute("UPDATE todos SET title=?, description=?, task=? WHERE id=?", (title, description, task, todo_id))
        conn.commit()
        conn.close()
    if request.method == 'PATCH':
        data = request.get_json()
        task = data.get('task')

        if task is None:
            return jsonify({"error": "Task field is required"}), 400

        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("UPDATE todos SET task=? WHERE id=?", (task, todo_id))
        conn.commit()
        conn.close()

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