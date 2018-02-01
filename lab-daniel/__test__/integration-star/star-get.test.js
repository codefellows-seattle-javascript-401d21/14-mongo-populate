'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/star`;

describe('Server module', () => {
  this.mockStar = { starName: 'test star get' };
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('GET /api/v1/star', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockStar);
    });
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(api)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
      it('Should respond with all stars', () => {
        expect(this.response.body).toBeTruthy();
      });
      it('Should respond with a single star', () => {
        return superagent.get(`${api}/${this.response.body[0]._id}`)
          .then(res => expect(res.body.starName).toBe('test star get'));
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should respond a not found or path error when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.response.text).toMatch(/ObjectId failed/);
          });
      });
      it('Should respond a 404 bad path when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});