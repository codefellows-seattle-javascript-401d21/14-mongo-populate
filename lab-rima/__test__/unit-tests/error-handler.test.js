'use strict';

require('dotenv').config({path: '../.test.env'});
const eH = require('../../lib/error-handler');

describe('Error handler module', function() {

  var mockRes = function() {
    this.resStatus = null;
    this.message = null;
    this.status = function(statusNum) {
      this.resStatus = statusNum;
      return this;
    };
    this.send = function(msg) {
      this.msg = msg;
      return this;
    };
  };


  describe('400 validation error', () => {

    test('return a status 400 with validation error', () => {
      let err = new Error('validation eRROR');
      expect(eH(err, new mockRes()).resStatus).toBe(400);
    });

  });

  describe('404 enoent', () => {

    test('return a status 404 with enoent', () => {
      let err = new Error('ENOENT');
      expect(eH(err, new mockRes()).resStatus).toBe(404);
    });

  });

  describe('404 path error', () => {

    test('return a status 404 with path error', () => {
      let err = new Error('path error');
      expect(eH(err, new mockRes()).resStatus).toBe(404);
    });

  });

  describe('404 objectid failed', () => {

    test('return a status 404 with objectid failed', () => {
      let err = new Error('objectid failed');
      expect(eH(err, new mockRes()).resStatus).toBe(404);
    });

  });

  describe('409 path error', () => {

    test('return a status 409 with duplicate key', () => {
      let err = new Error('duplicate key');
      expect(eH(err, new mockRes()).resStatus).toBe(409);
    });

  });

  describe('500 error', () => {

    test('return a status 500 with any other errors', () => {
      let err = new Error('500 Error');
      expect(eH(err, new mockRes()).resStatus).toBe(500);
    });

  });
});
