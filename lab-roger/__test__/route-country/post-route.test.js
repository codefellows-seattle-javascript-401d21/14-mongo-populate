'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/country`;

describe('Post Routes', () => {
  this.mockTest = { name: 'canada', continent: 'North America'};
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('POST /api/v1/country', () => {

    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.post(api)
          .send(this.mockTest)
          .then(res => this.response = res);
      });
      it('Should respond with a status 201', () => {
        expect(this.response.status).toBe(201);
      });
      it('Should return the created record', () => {
        expect(this.response.body).toBeInstanceOf(Object);
      });
    });

    describe('Invalid Routes ', () => {
      it('Should respond a not found or path error when given an incorrect path', () => {
        return superagent.post(`:${port}/api/v1/coun`)
          .catch(err => {
            expect(err.response.text).toMatch(/PATH/i);
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
