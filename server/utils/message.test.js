var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'Ricky';
        const text = 'I am in a band!';
        const message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');

    });
});