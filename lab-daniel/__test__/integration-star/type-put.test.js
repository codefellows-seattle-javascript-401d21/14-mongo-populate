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

  describe('PUT /api/v1/type', () => {
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
      it('Should respond with a status 204', () => {
        this.mockType.starName = 'updated';
        return superagent.put(`${api}/${this.response.body._id}`)
          .send(this.mockType)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      it('Should respond with a single type', () => {
        return superagent.get(`${api}/${this.response.body._id}`)
          .then(res => {
            expect(res.body.starName).toBe('updated');
          });
      });
    });
    describe('Invalid Routes/Data', () => {
      it('Should respond a validation error response if a file id does not match the id sent', () => {
        return superagent.put(`${api}/${this.response.body._id.slice(0, -1)}9`)
          .send(this.mockType)
          .catch(err => {
            expect(err.response.text).toMatch(/Validation/);
          });
      });
      it('Should return a status 400 if data is not sent with the put request', () => {
        return superagent.put(`${api}/${this.response.body._id}`)
          .catch(err => expect(err.status).toBe(400));
      });
    });
  });
});