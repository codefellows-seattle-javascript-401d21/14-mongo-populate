'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');



describe('POST /api/v1/animal', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.farm.removeAll);
  afterEach(mocks.animal.removeAll);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.farm.createOne()
        .then(farm => this.mockFarm = farm)
        .then(() => {
          this.fakeAnimal = {
            name: faker.hacker.ingverb(),
            class: faker.hacker.noun(),
            farm: this.mockFarm._id,
          };

          return superagent.post(`:${process.env.PORT}/api/v1/animal`)
            .send(this.fakeAnimal)
            .then(res => this.response = res);
        });
    });

    it('should return a status of 201', () => {
      expect(this.response.status).toEqual(201);
    });
    it('should return a new animal instance', () => {
      expect(this.response.body).toHaveProperty('_id');
    });
  });

  describe('inValid requests', () => {
    it('should return a status 400 given no request body', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/animal`)
        .send()
        .catch(err => expect(err.status).toEqual(400));
    });
    it('should return a status 400 given an improperly formatted body', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/animal`)
        .send({kappa: 200})
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});
