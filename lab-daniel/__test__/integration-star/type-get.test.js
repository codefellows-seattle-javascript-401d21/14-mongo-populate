'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/startype`;

describe('Route Testing', () => {
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());
  afterAll(mocks.type.removeAll);
  afterAll(mocks.type.removeAll);

  describe('GET /api/v1/type', () => {
    beforeAll(() => {
      return mocks.type.createOne()
        .then(type => this.mockType = type)
        .then(() => {

          return superagent.post(api)
            .send(this.mockType)
            .then(res => this.response = res);
        });
    });
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(`${api}/${this.response.body._id}`)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
      it('Should respond with all types', () => {
        expect(this.response.body).toBeTruthy();
      });
      it('Should respond with a single type', () => {
        expect(this.response.body.starName).toBe(this.mockType.starName);
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