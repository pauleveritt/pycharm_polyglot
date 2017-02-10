var describe = require('mocha').describe,
    it = require('mocha').it,
    expect = require('chai').expect;

describe('Hello World', function () {
    it('should ensure 1 is 1', function () {
        expect(1).eql(1);
    });
});