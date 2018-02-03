'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/star`;

describe('Route Testing', () => {
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());
  afterAll(mocks.star.removeAll);
  afterAll(mocks.type.removeAll);

  describe('DELETE /api/v1/star', () => {
    beforeAll(() => {
      return mocks.type.createOne()
        .then(type => this.mockType = type)
        .then(() => {
          this.mockStar = {
            starName: faker.hacker.ingverb(),
            starType: this.mockType._id,
          };

          return superagent.post(api)
            .send(this.mockStar)
            .then(res => this.response = res);
        });
    });
    describe('DELETE /api/v1/star', () => {
      it('Should respond with a status 204', () => {
        return superagent.del(`${api}/${this.response.body._id}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      it('Should respond with a 404 if the file does not exist', () => {
        return superagent.get(`${api}/${this.response.body._id}`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});