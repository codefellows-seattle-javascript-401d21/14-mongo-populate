'use strict';

require('jest');
let errorHandler = require('../../lib/error-handler');

class Res {
    constructor(err) {
        this.error = err;
        this.id = null;
        this.message = null;
    }

    status(id) {
        this.id = id;
        return this;
    }

    send(message) {
        this.message = message;
        return this;
    }
}

let validationErr = new Res(new Error('validation error'));
let enoentErr = new Res(new Error('enoent'));
let pathErr = new Res(new Error('path error'));
let objectIdErr = new Res(new Error('objectid failed'));
let duplicateErr = new Res(new Error('duplicate key'));
let defaultErr = new Res(new Error('default'));

describe('#Error-Handler', () => {

    it('should return status 400 for validation errors', () => {
        expect(errorHandler(validationErr.error, validationErr).id).toBe(400);
    });

    it('should return status 404 for enoent errors', () => {
        expect(errorHandler(enoentErr.error, enoentErr).id).toBe(404);
    });

    it('should return status 404 for path errors', () => {
        expect(errorHandler(pathErr.error, pathErr).id).toBe(404);
    });

    it('should return status 404 for object ID errors', () => {
        expect(errorHandler(objectIdErr.error, objectIdErr).id).toBe(404);
    }); 

    it('should return status 409 for duplicate errors', () => {
        expect(errorHandler(duplicateErr.error, duplicateErr).id).toBe(409);
    }); 

    it('should return status 500 for other errors', () => {
        expect(errorHandler(defaultErr.error, defaultErr).id).toBe(500);
    });
});