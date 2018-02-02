'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let tempPost, api = `:${port}/api/v1/country`;

describe('Server module', () => {
  this.mockTest = { name: 'canada'};
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('GET /api/v1/country', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockTest)
        .then(res => tempPost = res.body._id);

    });
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(api)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
      it('Should respond with all notes', () => {
        expect(this.response.body).toBeTruthy();
      });
      it('Should respond with a single note', () => {
        return superagent.get(`${api}/${tempPost}`)
          .then(res => expect(res.body.name).toBe('canada'));
      });
    });

    describe('Invalid Routes ', () => {
      it('Should respond a not found or path error when given an incorrect path', () => {
        return superagent.get(`:${port}/api/v1/coun`)
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
