'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
require('jest');

describe('DELETE /api/v1/cat', function () {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.owner.removeAll);
  afterAll(mock.cat.removeAll);

  describe('Valid req/res', () => {
    beforeAll(() => {
      return mock.cat.createOne()
        .then(res => {
          this.cat = res.cat;
          this.owner = res.owner;
        });  
    });

    beforeAll(() => {
      return superagent.delete(`:4000/api/v1/cat/${this.cat._id}`)
        .then(res => this.res = res);
    });
    it('should respond with a status of 201', () => {
      expect(this.res.status).toBe(204);
    });
    it('should remove the bike from the database', () => {
      return superagent.get(`:4000/api/cat/${this.cat._id}`)
        .catch(err => {        
          expect(err.status).toBe(404);
        });
    });
  });



  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad request body', () => {
      return superagent.delete(':4000/api/v1/cat')
        .catch(err => expect(err.status).toBe(400));
    });
  });
});

