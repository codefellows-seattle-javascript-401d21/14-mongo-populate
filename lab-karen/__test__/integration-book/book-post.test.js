'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/book', function() {
  this.mockBook = {title: 'A Christmas Carol', author: 'Dickins', year: 1843, category: 'fiction'};

  beforeAll(() => server.start());
  afterAll(() => server.stop());


  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/book')
        .send(this.mockBook)
        .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new note with title, author, year, and category', () => {
      expect(this.response.body).toHaveProperty('title');
      expect(this.response.body).toHaveProperty('author');
      expect(this.response.body).toHaveProperty('year');
      expect(this.response.body).toHaveProperty('category');
    });
    it('should respond with the data from the mockBook', () => {
      expect(this.response.body.title).toEqual(this.mockNote.title);
      expect(this.response.body.author).toEqual(this.mockNote.content);
      expect(this.response.body.title).toEqual(this.mockNote.year);
      expect(this.response.body.author).toEqual(this.mockNote.category);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/book')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});
