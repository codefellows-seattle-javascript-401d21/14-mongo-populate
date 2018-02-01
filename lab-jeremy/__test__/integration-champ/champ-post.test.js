'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/champ', function() {
  this.mockChamp = {name: 'vi', type: 'fighter', main_lane: 'jgl', winrate_percent: 48};

  beforeAll(server.start);
  afterAll(server.stop);

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/champ')
        .send(this.mockChamp)
        .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new champ with name, type, main_lane, and win_percent properties', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('type');
      expect(this.response.body).toHaveProperty('main_lane');
      expect(this.response.body).toHaveProperty('winrate_percent');
    });
    it('should respond with properties matching the mockChamp', () => {
      expect(this.response.body.name).toEqual(this.mockChamp.name);
      expect(this.response.body.type).toEqual(this.mockChamp.type);
      expect(this.response.body.main_lane).toEqual(this.mockChamp.main_lane);
      expect(this.response.body.winrate_percent).toEqual(this.mockChamp.winrate_percent);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockChamp)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/champ')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});