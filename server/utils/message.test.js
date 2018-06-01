var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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


describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {

        const from = 'Admin';
        const lat = 1;
        const lng = 2;
        const locationMessage = generateLocationMessage(from, lat, lng);

        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage.coords).toEqual({lat, lng});


    });

    
});