'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/animal', function() {
  this.mockNote = {name: 'horse', legs: 4};

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Valid', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/animal`)
        .send(this.mockNote)
        .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new note with name, legs, and _id', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('legs');
      expect(this.response.body).toHaveProperty('_id');
    });
    it('should respond with a name of "hello" and legs of "hello world"', () => {
      expect(this.response.body.name).toEqual(this.mockNote.name);
      expect(this.response.body.legs).toEqual(this.mockNote.legs);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/doesNotExist`)
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/animal`)
      .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});