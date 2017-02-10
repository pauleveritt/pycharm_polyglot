# DOM TDD with JSDOM

We earlier saw, in [TDD with Mocha](../mocha/mocha.md), how we can start on 
JavaScript TDD using Mocha. We used a very simple application and test.

In this section we show how frontend tooling can combine to provide
a TDD workflow targeted at browsers, using a fake DOM from the
[jsdom](https://github.com/tmpvar/jsdom) project.

## Overview

- Explain the need for a DOM in frontend TDD

- Install and setup `jsdom`

- Use Mocha setup/teardown hooks

- Make a "helpers" file to re-use common setup

## Fake DOM

We have been doing JavaScript TDD in Node, a headless environment.
But our goal is to write frontend application that run in the browser.
That means a DOM, plus some other non-Node machiner such as XHR.

For example, many frameworks, such as jQuery, expect there to be a DOM.
Your code won't even *import* without some globals for a `window` and
a `document`.

Fortunately there are solutions, such as
[jsdom](https://github.com/tmpvar/jsdom) which simulate what you need.
With `jsdom`, we can resume our Pythonic workflow: sit in PyCharm,
writing tests which import code and make assertions.

## Getting a DOM

Let's mix jQuery into the our `incrementor` from the Mocha Intro article
and see what happens. First we install it from npm and save it as a dependency
in our `package.json`:

.. code-block:: bash

    $ npm install --save jquery

We can now change our application code: instead of a function that returns an
incremented value, we increment the text node value of a `<div>`:

.. literalinclude:: app.js
    :language: js
    :caption: JSDOM app.js
    :emphasize-lines: 1,4

Our application code imports `jquery` using NodesJS/CommonJS
module imports, then changes the `<div>` content to equal
the incremented value.

We re-use the previous section's `test4.js` as `test1.js` in this
article:

[include](../../../src/jsdom/test1.js)

When we run the test now, though, armageddon ensues:

.. code-block:: bash

    Error: jQuery requires a window with a document
        at module.exports (jsdom/node_modules/jquery/dist/jquery.js:29:12)
        at incrementer (jsdom/app.js:4:5)
        at Context.<anonymous> (jsdom/test1.js:6:22)

Our first thought is: go get a browser. We could use
[PhantomJS](http://phantomjs.org) which has good package for Mocha
support. We could start over with the 
[Karma test runner](http://https://karma-runner.github.io/0.13/index.html). 
But these are *big* solutions. Slow, with lots of fiddling necessary, and not 
all headless.

Enter [jsdom](https://github.com/tmpvar/jsdom). This package simulates a
DOM, in your browser. While jsdom isn't perfect in simulating a browser, it is
fast and, relatively speaking, lightweight.

Let's install it as a development dependency:

```
$ npm install jsdom --save-dev
```

We now can write a `test2.js` which imports `jsdom` and sets some
global variables that `jQuery` expects. With that in place, we can import
`jQuery`:

[include](../../../src/jsdom/test2.js)

This test suite has a test that ensures we are setup correctly by
reading the initial text value of the `<div>`. The second test
executes our function and checks the updated value of the `<div>`.

And our tests pass! All is good...except, it isn't.

## Mocha Setup and Teardown

Python unit testers will spot the problem quickly: we aren't testing
in isolation! The second test modifies the `<div>`. Any subsequent
tests wouldn't be against a fresh `<div>`. If we added a third
test as a copy of the first, we'd see that:

[include](../../../src/jsdom/test3.js)

This third test fails, as the `<div>` has the value from the second
test, not the initial value.

Like Python's `unittest`, Mocha has concepts of `before`,
`beforeEach`, and `afterEach`. Let's say we want to balance speed
and isolation. We'd like to make a DOM once for all tests, but clean
up the `<body>` before each test. `test4.js` shows this:

[include](../../../src/jsdom/test4.js)

Our `Hello World` test suite initializes `$` and `incrementer`
at the test-suite scope. The `before` function runs once,
loading our application code once a DOM is setup and initialized. Then,
before each test, the `<body>` is reset to `<div>1</div>`.

Does this look like boilerplate that you'll repeat in each test? Let's
make a `helper.js` module that we can import at the top of all of
our tests, to provide such initialization:

[include](../../../src/jsdom/helper.js)

Our tests, as shown in `test5.js`, now look a lot nicer by importing
`helper.js` at the top:

[include](../../../src/jsdom/test5.js)

## Wrapup

This turned out to be pretty simple. Suspiciously simple, in fact. As it
turns out, this is one of those areas where frontend development is in
constant churn. `jsdom` won't always work, and other approaches will
have features that you can't live without.

Still, the basics of this article apply: you *can* do JavaScript TDD,
not just for server-side JavaScript in Node, but also frontend JavaScript
in browsers. It takes some patience to get it setup, but it sure beats the
normal browser development cycle of:

- Change code

- Switch to browser

- Reload

- Sprinkle `console.log` statements

- Sacrifice goats that nothing else broke