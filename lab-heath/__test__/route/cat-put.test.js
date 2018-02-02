'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/cat', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  this.mockCat = {name: 'bill', color: 'grey', age: 34};
  this.mockCat2 = {name: 'heath', color: 'grey', age: 34};
  let temp;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/cat')
      .send(this.mockCat)
      .then(res => {
        temp = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.put(`:4000/api/v1/cat/${temp._id}`)
          .send(this.mockCat2)
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid req/res', () => {
    it('should respond with a status of 204', () => {
      expect(this.resTwo.status).toBe(204);
    });
    it('should updated data should not be the orignal data.', () => {
      expect(this.response.body.title).not.toBe(/hello/);
      expect(this.response.body.content).not.toBe(/hello world/);
    });
    it('should get an item back and have these properties', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('color');
      expect(this.response.body).toHaveProperty('age');
    });
  });
  
  describe('invalid req/res PUT', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/cat/mihnigf`)
        .send(this.mockCat2)
        .catch(res => this.resTest = res);
    });

    it('should respond with a status of 404', () => {
      expect(this.resTest.status).toBe(404);
    });
  });
});