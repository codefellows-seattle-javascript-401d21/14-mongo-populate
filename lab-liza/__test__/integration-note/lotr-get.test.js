'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let idHolder, api = `:${port}/api/v1/lotr`;

describe('Server module', () => {
  this.mockCharacter = { name: 'Sam', species: 'Hobbit' };
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('GET /api/v1/lotr', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockCharacter);
    });
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(api)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
      it('Should respond with all characters', () => {
        idHolder = this.response.body[0];
        expect(this.response.body).toBeTruthy();
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should respond a 404 bad path when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});