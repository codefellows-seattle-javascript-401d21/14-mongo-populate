'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mocks = require('../../lib/mocks');

require('jest');


describe('GET /api/v1/cat', function () {
  // beforeAll(() => this.base = `:${process.env.PORT}/api/v1/cat`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.owner.removeAll);
  afterEach(mocks.cat.removeAll);
  

  beforeAll(() => {
    return mocks.cat.createMany(5)
      .then(results => this.catData = results);
  });


  describe('Valid req/res for GET ALL', () => {
    it('should return an array of IDs given no ID parameter in the route', () => {
      return superagent.get(`:4000/api/v1/cat`)
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toMatch(/[A-Za-z0-9]{24}/);
          expect(res.body[4]).toMatch(/[A-Za-z0-9]{24}/);
        });
    });
    it('should return a status 200', () => {
      return superagent.get(`:4000/api/v1/cat`)
        .then(res => expect(res.status).toEqual(200));
    });
  });
  describe('Invalid req/res', () => {
    it('should return a status code 400 without schema', () => {
      return superagent.get(':4000/api/v1/cat')
        .send()
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a 404 given an incorrect path', () => {
      return superagent.get(':4000/api/v1/doesnotexist')
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});
