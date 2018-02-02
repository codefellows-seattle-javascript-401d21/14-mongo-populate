'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/cat', function () {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  // afterEach(mocks.cat.removeAll);

  this.mockCat = {name: 'bill', color: 'grey', age: 34};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/cat')
      .send(this.mockCat)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.delete(`:4000/api/v1/cat/${temp._id}`)
          .then(res => this.resTwo = res);
      });
  });

  afterAll(() => {
    return superagent.delete(':4000/api/v1/cat');
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 201', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should respond with a status of 201', () => {
      expect(this.resTwo.body).toEqual({});
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
        .send({})
        .catch(err => expect(err.status).toBe(404));
    });
  });
});

