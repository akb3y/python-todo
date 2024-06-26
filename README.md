# Task Master

Task Master is an app that allows you to add, delete, and update tasks. You can mark a task as completed.

#### Table of Contents
  - [Technologies](#Technologies)
  - [Installation](#Installation)
  - [Operation](#Operation)

### Technologies

| Stack      | Dependancies   | Dev-dependancies |
| ---------- | -------------- | ---------------- |
| Python     | flask          | webpack/babel    |
| SQLite3    | react-icons    | eslint    | 
| React.js   | Axios          |

### Installation

1. Clone the repository

2. create virtual environment
   
   ```
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Use the package manager [npm](https://docs.npmjs.com/) and [pip](https://pip.pypa.io/en/stable/) to install the dependencies for Task Master.

   ```
   pip install -r requirements.txt
   npm install
   ```

3. Start the client

   ```
   npm start
   ```

4. Start the server

   ```
   python3 app.py
   ```

5. View in browser 

    `https://localhost:3000`

### Operation

-On load

`GET /todo`

-Create new task

`POST /todo`

-Update Completed task

`PUT /todo/<int:todo_id>`

-Delete task

`DELETE /todo/<int:todo_id>`

