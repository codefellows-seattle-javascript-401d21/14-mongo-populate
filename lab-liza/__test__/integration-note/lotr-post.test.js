'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/lotr', function() {
  this.mockNote = {name: 'Arwen', species: 'Elf'};

  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)));
  afterAll(() => server.stop());

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/lotr')
        .send(this.mockNote)
        .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new note with name, data, and _id', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('species');
      expect(this.response.body).toHaveProperty('_id');
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/lotr')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});