from os.path import join, abspath
from flask import render_template, send_from_directory

from todo import app

node_modules = abspath(join(app.root_path, '../node_modules'))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/lib/<path:filename>')
def base_static(filename):
    return send_from_directory(node_modules, filename)
