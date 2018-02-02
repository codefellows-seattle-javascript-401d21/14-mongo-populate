'use strict';

const faker = require('faker');
const server = require('../../lib/server');
const superagent = require('superagent');
const Book = require('../../model/book');
require('jest');

describe('DELETE /api/v1/book', function() {
  beforeAll(() => this.mockBook = {title: 'A Christmas Carol', author: 'Dickins', year: 1843, category: 'fiction'});

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  afterAll(() => Promise.all([Book.remove()]));

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/book')
        .send(this.mockBook)
        .then(res => this.response = res);
    });
    beforeAll(() => {
      return superagent.delete(`:4000/api/v1/book/${this.response._id}`)
        .then(res => this.deleteResponse = res.status);
    });

    it('should respond with a status of 204', () => {
      expect(this.response.status).toBe(204);
    });
    it('should no longer have a title, author, year or categoy', () => {
      expect(this.response.body).not.toHaveProperty('title');
      expect(this.response.body).not.toHaveProperty('author');
      expect(this.response.body).not.toHaveProperty('year');
      expect(this.response.body).not.toHaveProperty('category');
    });
    it('should no longer have an id', () => {
      expect(this.response.body._id).toBeUndefined();

    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.delete(':4000/api/v1/doesNotExist')
        .then(res => this.deleteResponse = res.status)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 404 on request without an id', () => {
      return superagent.delete(':4000/api/v1/book')
        .then(res => this.deleteResponse = res.status)
        .catch(err => expect(err.status).toBe(400));
    });
  });
});
