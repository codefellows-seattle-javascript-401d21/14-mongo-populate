'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/tolkien`;

describe('Route Testing', () => {
  this.mockCharacter = {name: 'Frodo', species: 'Hobbit'};
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('POST /api/v1/tolkien', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockCharacter)
        .then(res => this.response = res);
    });
    describe('Valid Routes/Data', () => {
      it('Should respond with a status of 201', () => {
        expect(this.response.status).toBe(201);
      });
      it('Should post a single note and return it', () => {
        expect(this.response.body).toHaveProperty('name');
        expect(this.response.body).toHaveProperty('species');
      });
      it('Should respond with a correct title and content', () => {
        expect(this.response.body.name).toBe('Frodo');
        expect(this.response.body.species).toBe('Hobbit');
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should return a 404 for an invalid path', () => {
        return superagent.post(':4000/api/v1/tolkien')
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
