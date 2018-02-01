'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/champ', function() {
  this.mockChamp = {name: 'vi', type: 'fighter', main_lane: 'jgl', winrate_percent: 48};

  beforeAll(server.start);
  afterAll(server.stop);

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/champ')
        .send(this.mockChamp);
    });

    beforeAll(() => {
      return superagent.get(':4000/api/v1/champ')
        .then(res => this.response = res);
    });

    it('should respond with a status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('should respond with a list of champs', () => {
      for(let i in this.response.body) {
        expect(this.response.body[i]).toMatch(/[0-9a-z]{24}/);
      }
    });
    it('should respond with a single champ', () => {
      return superagent.get(`:4000/api/v1/champ/${this.response.body[0]}`)
        .then(res => {
          expect(res.body.name).toBe('lulu');
          return res;
        })
        .then(res => expect(res.body.type).toBe('support'));
    });
  });

  describe('Invalid req/res', () => {
    it('Should respond a not found', () => {
      return superagent.get(`:4000/api/v1/champ/badpath`)
        .catch(err => {
          expect(err.response.text).toMatch(/ObjectId/);
        });
    });
    it('Should respond status code 404', () => {
      return superagent.get(`:4000/api/v1/champ/badpath`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});