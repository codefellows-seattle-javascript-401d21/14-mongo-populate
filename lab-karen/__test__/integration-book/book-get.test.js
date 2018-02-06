'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/book', function () {
  this.mockBook = {title: 'A Christmas Carol', author: 'Dickins', year: 1843, category: 'fiction'};
  this.mockBookTwo = {title: 'The Last Of The Spirits', author: 'Priestley', year: 2014, category: 'fiction'};

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/book')
        .send(this.mockBook)
        .then(res => {
          this.postOne = res;
          return superagent.post(':4000/api/v1/book')
            .send(this.mockBookTwo)
            .then(res => {
              this.postTwo = res;
            });
        });

    beforeAll(() => {
      return superagent.get(':4000/api/v1/book')
        .then(res => this.getAll = res);
    });
afterAll(() =>  superagent.delete(this.postOne.body_.id));
afterAll(() => superagent.delete(this.postTwo.body_.id));

    it('should respond with a status of 200', () => {
      expect(getAll.status).toBe(200);
    });

    it('should contain the two ids of records posted', () => {
      expect(getAll.body).toContain(this.postOne.body._id);
      expect(getAll.body).toContain(this.postTwo.body._id);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 400 without schema', () => {
      return superagent.get(':4000/api/v1/book')
      .then(res => this.allResponse = res.status)
      .catch(err => {
        expect(err.status).toBe(400);
    });
});
    it('should return a status 404 on bad path', () => {
      return superagent.get(':4000/api/v1/doesNotExist')
        .then(res => this.allResponse = res.status)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
  });
});

describe('GET /api/v1/book/:_id', function () {
  this.mockBook = {title: 'A Christmas Carol', author: 'Dickins', year: 1843, category: 'fiction'};
  this.mockBookTwo = {title: 'The Last Of The Spirits', author: 'Priestley', year: 2014, category: 'fiction'};

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/book')
        .send(this.mockBook)
        .then(res => {
          this.postOne = res;
          return superagent.post(':4000/api/v1/book')
            .send(this.mockBookTwo)
            .then(res => {
              this.postTwo = res;
            });
        });

    beforeAll(() => {
      return superagent.get(`:4000/api/v1/book/${this.postOne.body._id}`)
        .then(res => this.getOne = res);
    });
afterAll(() =>  superagent.delete(this.postOne.body_.id));
afterAll(() => superagent.delete(this.postTwo.body_.id));

    it('should respond with a status of 200', () => {
      expect(this.getOne.status).toBe(200);
    });

    it('should contain the title of the requested record', () => {
      expect(this.getOne.body.title).toEqual(this.mockBook.body.title);

    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 404 for a request with a bad id', () => {
      return superagent.get(':4000/api/v1/book/bad_id')
      .then(res => this.oneResponse = res.status)
      .catch(err => {
        expect(err.status).toBe(400);
    });
});
    it('should return a status 404 on bad path', () => {
      return superagent.get(':4000/api/v1/doesNotExist')
        .then(res => this.oneResponse = res.status)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
  });
});
