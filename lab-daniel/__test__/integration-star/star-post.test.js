'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/star`;

describe('Route Testing', () => {
  this.mockStar = {starName: 'test star post'};
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('POST /api/v1/star', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockStar)
        .then(res => this.response = res);
    });
    describe('Valid Routes/Data', () => {
      it('Should respond with a status of 201', () => {
        expect(this.response.status).toBe(201);
      });
      it('Should post a single star and return it', () => {
        expect(this.response.body).toHaveProperty('starName');
        expect(this.response.body).toHaveProperty('_id');
      });
      it('Should respond with a correct starName', () => {
        expect(this.response.body.starName).toBe('test star post');
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should return a 404 for an invalid path', () => {
        return superagent.post(':4000/api/v1/node')
          .catch(err => {
            expect(err.status).toBe(404);
            expect(err.response.text).toMatch(/Path/);
          });
      });
      it('Should respond with a bad request if bad data is sent', () => {
        return superagent.post(api)
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
  });
});