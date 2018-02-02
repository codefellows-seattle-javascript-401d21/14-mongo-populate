'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');
const faker = require('faker');


describe('PUT /', () => {

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterEach(mock.lang.removeAll);


  describe('Valid input', () => {

    // First new language
    // post an existing language to use it in test
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/language`)
        .send({name: 'English'})
        .then(res => this.postOne = res)
    });

    // update an existing language to use it in test
    beforeAll(() => {
      return superagent.put(`:${process.env.PORT}/api/v1/language/${this.postOne.body._id}`)
        .send({ name: 'Not English' })
        .then(res => this.putOne = res);
    });

    // get an existing language to use it in test
    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/language/${this.postOne.body._id}`)
        .then(res => this.getOne = res);
    });

    test(
      'should respond with http res status 204',
      () => {
        expect(this.putOne.status).toBe(204);
      });

    test(
      'should update name when put request is sent with new data',
      () => {
        expect(this.getOne.body.name).toEqual('Not English');
      });
  });

  describe('Invalid input', () => {

    test(
      'should return a status 404 if item not found',
      () => {
        return superagent.put(`:${process.env.PORT}/api/v1/language/12345`)
          .ok(res => res.status < 500)
          .catch(err => {
            expect(err.status).toEqual(404);
          });
      });
  });
});
