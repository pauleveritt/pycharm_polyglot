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


02 Delete
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