=========================
Webinar Table of Contents
=========================


00 Initial App
==============

Steps
-----

- Make a virtualenv

- In terminal, source env35/bin/activate

- pip install flask-restless flask-sqlalchemy

- Review run_server.py

- Run run_server.py

- Review everything in todo/*

- Explain run configuration


01 Delete
=========

Steps
-----

- index.html: Add <button> for delete

- todo.js: Add change handler for delete


02 Packaging
============

Python has infrastructure for installing libraries with dependencies.
JavaScript does as well, based on npm.

package.json is like setup.py + requirements.txt + Manifest.in +
setup.cfg + setuptools commands

Goals
-----

- Learn about browser-dev tooling using the NodeJS universe

- Convenient way to get all dependencies

- Reproducible builds

Steps
-----

- npm init --yes

- npm install --save jquery

- We skip bootstrap for this webinar, not packaging CSS

- Show node_modules

- views.py: Serve node_modules as /lib

- index.html: Load jquery from to <script src="/lib/jquery/dist/jquery.js">

- Remove unused todo/static/jquery


03 Better Linting
=================

PyCharm gives good Python linting. Out of the box, it gives decent
JS linting, but can be taught to do better with eslint.

Goals
-----

- Show more JS tooling and its support in PyCharm

- Better, more configurable linting with eslint

- Prep for linting on newer JS features

Steps
-----

- Install eslint with PyCharm Preferences, remember --save-dev in options

- Show package.json devDependencies and explain, like Python dependency groupings

- Create .eslintrc

- PyCharm preferences

- .eslintrc: Change from single to double, show warnings in todo.js


04 npm run Commands
===================

Steps
-----

- package.json: Change to "lint": "eslint todo/static/*.js"

- Terminal: npm run lint

- Surround Resig template engine with /*eslint-disable */   /*eslint-enable */

- package.json: right-click and run from PyCharm

- Fix error, re-run


05 Frontend split from backend with CORS
========================================

Goals
-----

- Let the UI rev on a different track than REST API

- In next step, leads to better frontend development experience

Steps
-----

- Preferences -> install flask-cors

- todo/__init__.py

    - from flask.ext.cors import CORS

    - CORS(app)

- mkdir app

- Drag-drop templates/index.html app

- Drag-drop static/* app

- index.html: Fix jQuery reference to ../node_modules

- todo.js

    - Search & replace /api/ to be full URL http://localhost:5000

- From root: python -m SimpleHTTPServer 8888


06 ES6 Modules with Babel and Webpack
=====================================

Steps
-----

- Change PyCharm Preference for JS to Ecmascript 6

- npm install --save-dev babel-preset-es2015

- npm install webpack webpack-dev-server babel-loader --save-dev

- Create webpack.config.js

- index.html: Change to bundle.js

- app.js and todo.js:

    - Remove IIFE

    - Import jQuery

- app.js

    - import initToDo from './todo'

    - At end: initToDo(document);

    - Move this.tmpl inside document ready since document isn't global any more

- todo.js

    - import $ from 'jquery';

    - export default function (document) {

    - var template = document.tmpl('list_todos');

- Run Python server, see that "document" is a problem

- package.json:  "start": "webpack-dev-server --content-base app/"

- Stop Python web server, npm start

- Show changing some JS, auto-reload

- Re-arrange windows to have side-by-side


07 Pythonic ES6
===============

Steps
-----

- String literals and array methods replace jQuery templating engine

    - Function for renderToDo (todo)

    - Make the string literal inside

    - Replace todos[i] with todo

    - In render::

                todos
                        .map(todo => renderTodo(todo))
                        .join('\n')

    - var template not needed, so 'document' doesn't have to be passed in

    - app.js: get rid of this.tmpl

- A class that gets returned

    - Constructor assigns this.todos, this.newValue and this.todoList, then calls render

    - Move renderTodo to a method

    - refresh

        - Convert to arrow function for lexical this

Another Time
============

- More ES6-as-Python

    - Rest paramaters and spread operator

    - Iterators and generators

    - Type hinting and interfaces via TypeScript

    - ES7: Decorators, async/await

- Chrome debugging, from PyCharm

- Headless TDD with Mocha, next time