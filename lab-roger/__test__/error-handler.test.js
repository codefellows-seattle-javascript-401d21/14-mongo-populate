'use strict';

require('jest');
const errorHandler = require('../lib/error-handler');

class Res {
  constructor (err){
    this.error = err;
    this.code = null;
    this.message = null;
  }

  status (code) {
    this.code = code;
    return this;
  }

  send (message) {
    this.message = message;
    return this;
  }

}

let enoent = new Res(new Error('ENOENT'));
let validation = new Res(new Error('Validation Error'));
let path = new Res(new Error('Path Error'));
let generic = new Res(new Error('Generic'));
let objectid_failed = new Res(new Error('objectid failed'));
let duplicate_key = new Res(new Error('duplicate key'));



describe('Error Handler', function() {

  it('should return an error 404 for any error containing ENOENT', () => {
    expect(errorHandler(enoent.error, enoent).code).toBe(404);
  });
  it('should return an error 400 for any error containing Validation', () => {
    expect(errorHandler(validation.error, validation).code).toBe(400);
  });
  it('should return an error 404 for any error containing Path', () => {
    expect(errorHandler(path.error, path).code).toBe(404);
  });
  it('should return an error 500 for any error containing generic', () => {
    expect(errorHandler(generic.error, generic).code).toBe(500);
  });
  it('should return an error 404 for any error containing object failed', () => {
    expect(errorHandler(objectid_failed.error, objectid_failed).code).toBe(404);
  });
  it('should return an error 404 for any error containing Duplicate Key', () => {
    expect(errorHandler(duplicate_key.error, duplicate_key).code).toBe(409);
  });

});
