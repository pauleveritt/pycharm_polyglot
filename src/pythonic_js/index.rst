===============================
Pythonic JavaScript with ES2015
===============================

We've seen a lot so far on the frontend toolchain, Pythonic development
with modules, TDD, etc. But what about basic language features? JavaScript
is notoriously more janky than Python. But what if you could code in a
more Pythonic JavaScript, while still supporting most browsers?

In this section we introduce the concept of *transpiling* pleasant
JavaScript using `Babel <https://babeljs.io>`_.

Overview
========

- Explain the concept of transpiling

- Introduce Babel as the most popular transpiler

- Show Pythonic idioms in latest JavaScript

Background
==========

JavaScript code is ugly and missing many features we take for granted in
Python. However, it is a platform that is available *everywhere*. Even
though it is unpleasant, people still target it for web development.

In the past few years, a quiet revolution has taken place. What if we
could treat the browser as a deployment target, and write our code in
something nicer which "transpiles" into executable JavaScript? Python
has a slightly similar concept: it reads pretty ``.py`` files and
byte-compiles them into ``.pyc`` files.

For the JavaScript compilers, the output is a flavor of JavaScript that
is supported by many browsers, but using crazy techniques to cover
various holes. This lets you write in a more pleasant input, transpile
into "ES5" (an ECMAScript version supported by many browsers), and gain
the productivity win you wanted.

This revolution has freed the ECMAScript (aka JavaScript) standards
committee to dramatically speed up the improvements to the language. It
matters less whether browsers keep up, as we're just going to transpile
these syntax improvements into compliant deployment output.

Frontend developers now talk about "ES2015", the set of standards
approved by the committee in the year 2015, as a group of improvements
they can adopt. ES2016 and beyond are already in multiple stages of
adoption.

Fortunately PyCharm (and particularly WebStorm) have done a
*fantastic* job of keeping up with this advanced pace of development.

.. note::

    These improvements were originally version-numbered, so you
    will frequently see "ES6". However, the committee adopted
    time-based releases, so the jargon is now "ES2015" etc.

Starting Point
==============

Let's use, as a starting point, a combination of results from earlier
sections:

- ``package.json`` for dependencies and automation

- ``.eslintrc`` for controlling our linter, and thus PyCharm

- Webpack for bundling our app file and our lib file

We are going to do a variation on the ``incrementer`` pattern. In this
case, when you click on a button, it adds a random number to a ``<li>``
list in the browser.

The Incrementer
===============

Let's jump into the results. We start with an ``index.html`` file:

.. literalinclude:: index.html
    :language: html
    :caption: Pythonic JavaScript index.html
    :emphasize-lines: 9, 11, 12

This HTML file has a few responsibilities:

- Provide a button which, when clicked, will add something to the
  ``<ul>``

- A ``<ul>`` that is the holder of the generated numbers

- A ``<script>`` which loads the bundle resulting from Webpack,
  driven by the ``webpack.config.js`` and the ``webpack-dev-server``

We have two JavaScript files. Our "application" interacts with the
browser and drives the library:

.. literalinclude:: app.js
    :language: js
    :caption: Pythonic JavaScript app.js

Our "library" knows nothing about a browser, which makes it very
test-able:

.. literalinclude:: lib.js
    :language: js
    :caption: Pythonic JavaScript lib.js

Let's take a look at the Pythonic JavaScript changes that we get from
the switch to ES2015, transpiled by Babel into old-style JavaScript.

Pythonic JavaScript
===================

``app.js`` starts with an "ES6" import, which we saw in
:doc:`../es6_imports/index`. We are loading a "default export",
so the name we choose in ``app.js`` is de-coupled from the name
used in the exporting library.

We define a function to execute when the document is loaded. But
there is no ``function`` declaration. What's up with that? We're
using a new feature called "arrow functions", which look like
``() => {}``. These are anonymous, inline functions that have a
benefit of lexical scoping. They are terse and useful.

Next, we define two variables, but instead of using ``var``, we
use ``let``, the new ES2015 way to define variables that gets out
of the ``this`` hell. Essentially there is no reason to ever use
``var`` again, though you might want to use the new ``const``.

``app.js`` then attaches a click handler using an arrow function.

Now, on to the more exciting improvements in ``lib.js``. On the
very first line we see ``class``. ES2015 has a mostly-Pythonic
syntax for define classes that are, in most respects, syntactic
sugar atop the existing JavaScript prototype-based hierarchy.
Classes are seeing huge adoption in ES2015-oriented frameworks
and patterns.

Our ``Incrementer`` class has a constructor and two methods.
The ``add`` method shows that ``this`` is bound to the instance of
the class.

The ``toHtml`` method shows two very useful additions. First,
ES2015 has a number of very useful array methods, such as
``map``. Also, we finally get multiline strings, similar to
Python's triple quoted strings. These "template strings" are
string literals which can contain expressions, similar to Python's
``printf`` and now ``.format()`` style string templating.

Wrapup
======

The use of Webpack for bundling was a big step. It made us run code
through something before we could use it in a browser. Still, we
could do TDD natively, directly on our test code and our application
code.

With the move to ES2015, none of our code will run without the
transpiling step. We faced that in :doc:`../es6_imports/index` but
we could always chicken-out and go back to ``require`` for
CommonJS modules and imports.

Is the complexity price worth it? As frontend applications get
more sophisticated, the answer is yes. Having code that doesn't
hurt your eyeballs means you can write better code the first time.