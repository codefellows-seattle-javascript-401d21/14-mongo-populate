'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mocks = require('../../lib/mocks');
const faker = require('faker');
require('jest');

describe('POST /api/v1/cat', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/cat`);
  beforeAll(server.start);
  afterAll(server.stop);


  describe('Valid req/res', () => {
    beforeAll(() => {
      return mocks.owner.createOne()
        .then(owner => this.mockOwner = owner)
        .then(() => {
          this.fakeCat = {
            color: faker.hacker.ingverb(),
            name: faker.hacker.noun(),
            owner: this.mockOwner._id,
          };
  
          return superagent.post(`${this.base}`)
            .send(this.fakeCat)
            .then(res => this.response = res);
        });
    });


    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should post a new note with name, data, and _id', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('color');
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesNotExist')
        .send(this.mockCat)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':4000/api/v1/cat')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});


