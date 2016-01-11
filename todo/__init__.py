from flask import Flask
import flask.ext.sqlalchemy
import flask.ext.restless

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.sqlite'
db = flask.ext.sqlalchemy.SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)


db.create_all()

manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Todo, methods=['GET', 'POST', 'DELETE', 'PATCH'])

import todo.views
