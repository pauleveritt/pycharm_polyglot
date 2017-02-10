var describe = require('mocha').describe,
    it = require('mocha').it,
    expect = require('chai').expect,
    incrementer = require('./app1');

describe('Hello World', function () {
    it('should increment a value', function () {
        var result = incrementer(8);
        expect(result).eql(9);
    });
});