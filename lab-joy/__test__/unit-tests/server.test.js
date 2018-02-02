'use strict';

require('jest');
let server = require('../../lib/server');

describe('#Server', () => {
    beforeAll(() => server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)));
    afterAll(() => server.stop());

    it('should throw an error if trying to start server when server is already on', () => {
        expect(() => {
            server.start(process.env.PORT, new Error(err));
        }).toThrow();
    });

    it('should throw an error if trying to stop the server when it is not on', () => {
        expect(() => {
            server.stop(new Error(err));
        }).toThrow();
    });
});