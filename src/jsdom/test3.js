var describe = require('mocha').describe,
    it = require('mocha').it,
    expect = require('chai').expect,
    jsdom = require('jsdom');

global.document = jsdom.jsdom('<body><div>1</div></body>');
global.window = document.defaultView;
var $ = require('jquery');

var incrementer = require('./app');

describe('Hello World', function () {
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