'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

describe('GET /api/v1/animal', function () {
  this.base = `:${process.env.PORT}/api/v1/animal`;
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.farm.removeAll);
  afterEach(mocks.animal.removeAll);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.animal.createMany(25)
        .then(results => {
          this.animalData = results;
        });
    });

    it('should return an array of IDs given no ID parameter in the route', () => {
      return superagent.get(`${this.base}`)
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.includes(this.animalData.animals[0]._id.toString())).toBeTruthy();
          expect(res.body.includes(this.animalData.animals[10]._id.toString())).toBeTruthy();
          expect(res.body.includes(this.animalData.animals[18]._id.toString())).toBeTruthy();
        });
    });
    it('should return a status 200', () => {
      return superagent.get(`${this.base}`)
        .then(res => expect(res.status).toEqual(200));
    });

    it('should return a status 200 given a valid ID', () => {
      return superagent.get(`${this.base}/${this.animalData.animals[0]._id}`)
        .then(res => expect(res.status).toEqual(200));
    });
    it('should return the correct data from a given objects ID', () => {
      return superagent.get(`${this.base}/${this.animalData.animals[0]._id}`)
        .then(res => {
          expect(res.body._id).toEqual(this.animalData.animals[0]._id);
          expect(res.body.title).toEqual(this.animalData.animals[0].title);
          expect(res.body.artist).toEqual(this.animalData.animals[0].artist);
        });
    });
  });
});

describe('inValid requests', () => {

});
