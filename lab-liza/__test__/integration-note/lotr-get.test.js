'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/lotr`;

describe('Route Testing', () => {
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());
  afterAll(mocks.lotr.removeAll);
  afterAll(mocks.species.removeAll);

  describe('GET /api/v1/lotr', () => {
    beforeAll(() => {
      return mocks.species.createOne()
        .then(species => this.mockSpecies = species)
        .then(() => {
          this.mockLotr = {
            name: faker.hacker.ingverb(),
            species: this.mockSpecies._id,
          };

          return superagent.post(api)
            .send(this.mockLotr)
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
      it('Should respond with all lotrs', () => {
        expect(this.response.body).toBeTruthy();
      });
      it('Should respond with a single lotr', () => {
        expect(this.response.body.lotrName).toBe(this.mockLotr.lotrName);
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