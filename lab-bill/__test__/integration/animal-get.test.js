'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/animal', function() {
  this.mockanimal = {name: 'hello', data: 'hello world'};

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Valid', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/animal`)
        .send(this.mockanimal)
        .then(res => this.response = res);
    });

    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/animal`)
        .then(res => this.getAll = res);
    });

    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/animal/${this.getAll.body[0]}`)
        .then(res => this.getOne = res);
    });

    afterAll(() => {
      return superagent.delete(`:${process.env.PORT}/api/v1/animal/${this.getAll.body[0]}`);
    });

    it('fetch ALL should respond with a status of 200', () => {
      expect(this.getAll.status).toBe(200);
     });
    it('fetch ONE should respond with a status of 200', () => {
      expect(this.getOne.status).toBe(200);
    });
    it('fetch ONE should have a response body with name, data and _id', () => {
      expect(this.getOne.body).toHaveProperty('name');
      expect(this.getOne.body).toHaveProperty('legs');
      expect(this.getOne.body).toHaveProperty('_id');
    });
    it('fetch ALL should respond with an array of ids', () => {
      expect(typeof this.getAll.body).toEqual('object');
      expect(this.getAll.body[0].length).toEqual(24);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad directory schema', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/doesanimalxist`)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad id request', () => {
      return superagent.get(`:${process.env.PORT}/api/v1/animal/1234`)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/cast/i);
        });
    });
  });
});