'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/champ', function() {
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
      return superagent.put(`:4000/api/v1/champ/${this.response.body._id}`)
        .send({name: 'updated name', type: 'updated type', _id: this.response.body._id})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond having the new name and type', () => {
      return superagent.get(`:4000/api/v1/champ/${this.response.body._id}`)
        .then(res => {
          expect(res.body.name).toBe('updated name');
          expect(res.body.type).toBe('updated type');
        });
    });
    it('Should respond with a status 204', () => {
      return superagent.put(`:4000/api/v1/champ/${this.response.body._id}`)
        .send({name: 'vi', type: 'fighter', _id: this.response.body._id})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond having the new name and type', () => {
      return superagent.get(`:4000/api/v1/champ/${this.response.body._id}`)
        .then(res => {
          expect(res.body.name).toBe('vi');
          expect(res.body.type).toBe('fighter');
        });
    });
  });

  describe('Invalid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/champ')
        .send(this.mockChamp)
        .then(res => this.response = res);
    });


    it('should return a status 404 on bad path', () => {
      return superagent.put(':4000/api/v1/badid')
        .send({name: 'updated name', type: 'updated type', _id: this.response.body._id})
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(`:4000/api/v1/champ/${this.response.body._id}`)
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});