'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/lotr`;

describe('DELETE /api/v1/lotr', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/lotr`);
  beforeAll(server.start);
  afterAll(server.stop);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.species.createOne()
        .then(species => this.mockSpecies = species)
        .then(() => {
          this.fakeLotr = {
            name: faker.hacker.noun(),
            species: this.mockSpecies._id,
          };

          return superagent.post(`${api}`)
            .send(this.fakeLotr)
            .then(res => this.response = res);
        });
    });

    it('should return a status 204 on successful deletion', () => {
      return superagent.delete(`${api}/${this.response.body._id}`)
        .then(res => expect(res.status).toEqual(204));
    });
  });

  describe('inValid requests', () => {
    it('should return a 404 given an invalid ID', () => {
      return superagent.delete(`${this.base}/1234`)
        .catch(err => expect(err.status).toEqual(404));
    });
  });
});
