var describe = require('mocha').describe,
    it = require('mocha').it,
    expect = require('chai').expect,
    before = require('mocha').before,
    beforeEach = require('mocha').beforeEach,
    jsdom = require('jsdom');


describe('Hello World', function () {
    var $, incrementer;
    before(function () {
        global.document = jsdom.jsdom('<body></body>');
        global.window = document.defaultView;
        $ = require('jquery');
        incrementer = require('./app');
    });
    beforeEach(function () {
        $('body').html('<div>1</div>');
    });
    it('should start with 1', function () {
        expect($('div').text()).equal('1');
    });
    it('should increment to 6', function () {
        incrementer(5);
        expect($('div').text()).equal('6');
    });
    it('should start with 1', function () {
        expect($('div').text()).equal('1');
    });
});