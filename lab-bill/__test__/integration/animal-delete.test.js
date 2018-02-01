'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/animal', function() {
  this.mockanimal = {name: 'cat', legs: 4};

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
      return superagent.delete(`:${process.env.PORT}/api/v1/animal/${this.getAll.body[0]}`)
        .then(res => this.delRes = res);
    });

    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/animal`)
        .then(res => this.afterDelete = res);
    });

    it('should respond with a status of 204', () => {
      expect(this.delRes.status).toBe(204);
    });
    it('the amount of animals should be lower after a delete', () => {
      expect(this.getAll.body.length > this.afterDelete.body.length).toBe(true);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad directory schema', () => {
      return superagent.delete(`:${process.env.PORT}/api/v1/doesanimalxist`)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad id request', () => {
      return superagent.delete(`:${process.env.PORT}/api/v1/animal/1234`)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/cast/i);
        });
    });
  });
});