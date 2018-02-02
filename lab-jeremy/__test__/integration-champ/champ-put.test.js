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
          return superagent.put(`${this.base}/${this.response.body._id}`)
            .send({name: faker.hacker.noun(), winrate_percent:(Math.random() * (70 - 40) + 40)})
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
    it('should return a status 400 given no request body', () => {
      return superagent.put(`${this.base}/${this.response.body._id}`)
        .send()
        .catch(err => expect(err.status).toEqual(400));
    });
    it('should return a status 400 given an improperly formatted body', () => {
      return superagent.put(`${this.base}/${this.response.body._id}`)
        .send({gnarf: 200})
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});