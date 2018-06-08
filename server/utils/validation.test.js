var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should validate non-empty string input', () => {
        const string = '    Dion ';
        expect(isRealString(string)).toBe(true);


    });

    it('should reject string with empty space only', () => {
        const emptyString = '    ';
        expect(isRealString(emptyString)).toBe(false);
    });

    it('should reject non string values', () => {
        const number = 12;
        expect(isRealString(number)).toBe(false);
    });
});