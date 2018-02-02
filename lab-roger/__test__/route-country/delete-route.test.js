'use strict';

// Testing Dependencies
const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/country`;

describe('Delete Route Testing', () => {
  this.mockTest = { name: 'usa' };
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Delete  /api/v1/country', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockTest)
        .then(res => this.response = res);
    });
    describe('DELETE /api/v1/country', () => {
      it('Should respond with a status 204', () => {
        return superagent.del(`${api}/${this.response.body._id}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      it('Should respond with a 404 if the file does not exist', () => {
        return superagent.del(`${api}/${this.response.body._id.slice(0, -1)}9`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});
