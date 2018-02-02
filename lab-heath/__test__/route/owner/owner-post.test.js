'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks.js');
const faker = require('faker');

require('jest');

describe('POST', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.owner.removeAll);
  afterAll(mock.cat.removeAll);

  describe('Valid req/res', () => {
    beforeAll(() => {
      this.owner = {name: faker.name.firstName()};
      return superagent.post(':4000/api/v1/owner')
        .send(this.owner)
        .then(res => this.res = res);
    });
    it('should post a new owner object with a name and cat property', () => {
      expect(this.res.body.name).toBe(this.owner.name);
      expect(this.res.body).toHaveProperty('cats');
    });
    it('should respond with a status of 201', () => {
      expect(this.res.status).toBe(201);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesnotexist')
        .send(this.owner)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on a bad request body', () => {
      return superagent.post(':4000/api/v1/cat')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});