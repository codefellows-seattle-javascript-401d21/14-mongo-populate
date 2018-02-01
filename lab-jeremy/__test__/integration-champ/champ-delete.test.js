'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/champ', function() {
  this.mockChamp = {name: 'vi', type: 'fighter', main_lane: 'jgl', winrate_percent: 48};

  beforeAll(server.start);
  afterAll(server.stop);

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/champ')
        .send(this.mockChamp)
        .then(res => this.response = res);
    });        

    it('Should respond with a status 200', () => {
      return superagent.del(`:4000/api/v1/champ/${this.response.body._id}`)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
  });

  describe('Invalid req/res', () => {
    it('Should respond with a status 404 if file doesnt exist', () => {
      return superagent.del(`:4000/api/v1/champ/badpath`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});