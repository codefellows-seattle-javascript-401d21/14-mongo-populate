'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/lotr`;

describe('Route Testing', () => {
  this.mockCharacter = { name: 'Eowyn', species: 'Human' };
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('PUT /api/v1/lotr', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockCharacter)
        .then(res => this.response = res)
        .then(() => this.mockCharacter._id = this.response.body._id);
    });

    describe('Valid Routes/Data', () => {
      it('Should respond with a status 204', () => {
        this.mockCharacter.content = 'updated';
        return superagent.put(`${api}/${this.mockCharacter._id}`)
          .send(this.mockCharacter)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
    });
    describe('Invalid Routes/Data', () => {
      it('Should return a status 400 if data is not sent with the put request', () => {
        return superagent.put(`${api}/${this.mockCharacter._id}`)
          .catch(err => expect(err.status).toBe(400));
      });
    });
  });
});