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

- Put in a double quote error, run again

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

- todo/__init__.py: import, CORS(app)

- mkdir app

- cp templates/index.html app

- cp -r static/* app

- Fix references in index.html

- todo.js

    - Get nunjucks template without static

    - Change /api/ to be full URL http://localhost:5000

- python -m SimpleHTTPServer 8888


06 ES6 Modules with Babel
=========================

Steps
-----

- Install Handlebars plugin

- Housekeeping: delete todo/static and todo/templates

- Change PyCharm Preference for JS to Ecmascript 6

- npm install --save-dev babel-cli

- npm install --save-dev babel-preset-es2015 babel-preset-stage-0

- npm install babel-loader webpack --save-dev

- npm install style-loader css-loader --save-dev

XX Development serving with webpack
===================================

Goals
-----

- Learn about bundling assets

- Work productively with live reloading

Steps
-----

- npm install --save-dev webpack webpack-dev-server

- Create webpack.config.js


07 Transpiling with Babel
=========================

08 ES6 (ES2015) Modules
=======================


To Do
=====

- Show Chrome debugging

- Mention we're not doing the really-right way, TDD with Mocha, next time