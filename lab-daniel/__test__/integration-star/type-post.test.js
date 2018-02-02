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

  describe('POST /api/v1/type', () => {
    beforeEach(() => {
      return mocks.type.createOne()
        .then(type => this.mockType = type)
        .then(() => superagent.post(api)
          .send(this.mockType)
          .then(res => this.response = res)
        );

    });
    describe('Valid Routes/Data', () => {
      it('Should respond with a status of 201', () => {
        expect(this.response.status).toBe(201);
      });
      it('Should post a single type and return it', () => {
        expect(this.response.body).toHaveProperty('starName');
        expect(this.response.body).toHaveProperty('_id');
      });
      it('Should respond with a correct starName', () => {
        expect(this.response.body.starName).toBe(this.mockType.starName);
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