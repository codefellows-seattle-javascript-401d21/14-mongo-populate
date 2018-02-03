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

  describe('GET /api/v1/star', () => {
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
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(`${api}/${this.response.body._id}`)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
      it('Should respond with all stars', () => {
        expect(this.response.body).toBeTruthy();
      });
      it('Should respond with a single star', () => {
        expect(this.response.body.starName).toBe(this.mockStar.starName);
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should respond a not found or path error when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.response.text).toMatch(/ObjectId failed/);
          });
      });
      it('Should respond a 404 bad path when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});