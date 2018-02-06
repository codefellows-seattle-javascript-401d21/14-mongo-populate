'use strict';

let eH = require('../../lib/error-handler');
require('jest');

describe('testing dummy', function () {
  it('should return true', () => expect(true).toBeTruthy());
});

class Res {
  constructor (err) {
    this.error = err,
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
let validation = new Res (new Error('Validation'));
let path = new Res (new Error('Path Error'));
let objectid = new Res (new Error('objectid failed'));
let duplicate = new Res (new Error('duplicate key'));
let catchall = new Res (new Error('catchall'));

describe('Error Handler', () => {
  it('should return an error 404 for any error containing ENOENT', () => {
    expect(eH(enoent.error, enoent).code).toBe(404);
  });
  it('should return an error 404 for any error containing Path Error', () => {
    expect(eH(path.error, path).code).toBe(404);
  });
  it('should return an error 404 for any error containing objectid failed', () => {
    expect(eH(objectid.error, objectid).code).toBe(404);
  });
  it('should return an error 400 for any error containing Validation', () => {
    expect(eH(validation.error, validation).code).toBe(400);
  });
  it('should return an error 409 for any error containing ENOENT', () => {
    expect(eH(duplicate.error, duplicate).code).toBe(409);
  });
  it('should return an error 500 for any other errors', () => {
    expect(eH(catchall.error, catchall).code).toBe(500);
  });
});
