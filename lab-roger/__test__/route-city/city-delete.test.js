'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

describe('DELETE /api/v1/city', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/city`);
  beforeAll(server.start);
  afterAll(server.stop);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.country.createOne()
        .then(country => this.mockCountry = country)
        .then(() => {
          this.fakeCity = {
            name: faker.address.city(),
            country: this.mockCountry._id,
          };

          return superagent.post(`${this.base}`)
            .send(this.fakeCity)
            .then(res => {
              this.response = res;
            });
        });
    });

    it('should return a status 204 on successful deletion', () => {
      return superagent.delete(`${this.base}/${this.response.body._id}`)
        .then(res => {
          console.log('res', res.body);
          expect(res.status).toEqual(204);
        });
    });
  });

  describe('inValid requests', () => {
    it('should return a 404 given an invalid ID', () => {
      return superagent.delete(`${this.base}/1234`)
        .catch(err => expect(err.status).toEqual(404));
    });
  });
});