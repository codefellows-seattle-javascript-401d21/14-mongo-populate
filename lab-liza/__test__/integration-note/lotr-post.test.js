'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

describe('POST /api/v1/lotr', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/lotr`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.species.removeAll);
  afterEach(mocks.lotr.removeAll);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.species.createOne()
        .then(species => this.mockSpecies = species)
        .then(() => {
          this.fakeLotr = {
            name: faker.hacker.noun(),
            species: this.mockSpecies._id,
          };

          return superagent.post(`${this.base}`)
            .send(this.fakeLotr)
            .then(res => this.response = res);
        });
    });

    it('should return a status of 201', () => {
      expect(this.response.status).toEqual(201);
    });
    it('should return a new lotr instance', () => {
      expect(this.response.body).toHaveProperty('_id');
    });
  });

  describe('inValid requests', () => {
    it('should return a status 400 given no request body', () => {
      return superagent.post(`${this.base}`)
        .send()
        .catch(err => expect(err.status).toEqual(400));
    });
    it('should return a status 400 given an improperly formatted body', () => {
      return superagent.post(`${this.base}`)
        .send({gnarf: 200})
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});