'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

describe('PUT /api/v1/champ', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/champ`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.season.removeAll);
  afterEach(mocks.champ.removeAll);

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.season.createOne()
        .then(season => this.mockSeason = season)
        .then(() => {
          this.fakeChamp = {
            name: faker.hacker.noun(),
            type: faker.hacker.ingverb(),
            main_lane: faker.hacker.ingverb(),
            winrate_percent: (Math.random() * (70 - 40) + 40),
            season: this.mockSeason._id,
          };

          return superagent.post(`${this.base}`)
            .send(this.fakeChamp)
            .then(res => this.response = res);
            
        })
        .then(() => {
          return superagent.delete(`${this.base}/${this.response.body._id}`)
            .then(res => this.updateResponse = res);
        });
    });
    
    it('should return a status of 204 (no content)', () => {
      expect(this.updateResponse.status).toEqual(204);
    });
    it('should return no body', () => {
      expect(this.updateResponse.body).toEqual({});
    });
  });

  describe('Invalid requests', () => {
    it('should return a status 404 given a bad route', () => {
      return superagent.delete(`${this.base}/badpath`)
        .catch(err => expect(err.status).toEqual(404));
    });
    it('should return a status 400 given no id', () => {
      return superagent.delete(`${this.base}`)
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});