'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

describe('POST /api/v1/city', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/city`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.country.removeAll);
  afterEach(mocks.city.removeAll);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.country.createOne()
        .then(country => this.mockCountry = country)
        .then(() => {
          this.fakeCity = {
            name: faker.address.country(),
            country: this.mockCountry._id,
          };

          return superagent.post(`${this.base}`)
            .send(this.fakeCity)
            .then(res => this.response = res);
        });
    });

    it('should return a status of 201', () => {
      expect(this.response.status).toEqual(201);
    });
    it('should return a new track instance', () => {
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