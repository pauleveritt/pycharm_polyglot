require('./helper');
var describe = require('mocha').describe,
    it = require('mocha').it,
    expect = require('chai').expect,
    beforeEach = require('mocha').beforeEach,
    $ = require('jquery'),
    incrementer = require('./app');

describe('Hello World', function () {
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