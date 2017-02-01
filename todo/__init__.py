from flask import Flask
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.sqlite'
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)


db.create_all()

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Todo, methods=['GET', 'POST', 'DELETE', 'PATCH'])

import todo.views
