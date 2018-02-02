'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/book', function() {
  this.mockBook = {title: 'Scrooge', author: 'Dickins', category: 'fiction'};
  this.updateMockBook = {title: 'A Christmas Carol', author: 'Dickins', year: 1843, category: 'fiction'};

  beforeAll(() => server.start());
  afterAll(() => server.stop());


  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/book')
        .send(this.mockBook)
        .then(res => this.response = res);
    });
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/book/${this.response._id}`)
        .send(this.updateMockBook)
        .then(res => this.putResponse = res);
    });
    afterAll(() => superagent.delete(this.response));
    afterAll(() => superagent.delete(this.putResponse));

    it('should respond with a status of 200', () => {
      expect(this.putResponse.status).toBe(200);
    });
    it('should update the title and have a year', () => {
      expect(this.putResponse.body).not.toEqual('Scrooge');
      expect(this.putResponse.body).toHaveProperty('year');
    });
    it('should have the same id', () => {
      expect(this.putResponse._id).toEqual(this.response._id);
    });
  });
  describe('Invalid req/res', () => {
    it('should return a status 404 if an id is not included', () => {
      return superagent.post(':4000/api/v1/book')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on bad request body', () => {
      return superagent.post(':4000/api/v1/boo')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});
