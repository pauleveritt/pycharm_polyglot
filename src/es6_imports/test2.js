import { describe, before, it } from 'mocha';
import {expect} from 'chai';
import incrementer from './lib2';

describe('Hello World', function () {
    it('should increment a value', function () {
        var result = incrementer(8);
        expect(result).eql(9);
    });
});