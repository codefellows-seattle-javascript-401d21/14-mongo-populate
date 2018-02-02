'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');
const faker = require('faker');


describe('POST /api/v1/language', () => {

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  // delete all data after all tests
  afterAll(() => mock.lang.removeAll);


  describe('Valid req/res', () => {

    // create a new language to use it in test
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/language`)
        .send({name: 'English'})
        .then(res => this.resPost = res);
    });

    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/language/${this.resPost.body._id.toString()}`)
            .then(res => this.resGet = res);
    })

    test(
      'should respond with http res status 201',
      () => {
        expect(this.resPost.status).toBe(201);
      });

    test(
      'should create a new language with correct data',
      () => {
        expect(this.resPost.body.name).toEqual('English');
      });

    test(
      'should have an _id property on the response object',
      () => {
        expect(this.resPost.body).toHaveProperty('_id');
      });
  });

  describe('Invalid req/res', () => {

    test(
      'should not accept invalid input',
      () => {
        superagent.post(`:${process.env.PORT}/api/v1/language`)
          .ok(res => res.status < 500)
          .send({author: 'au'})
          .catch(err => expect(err.status).not.toBe(201));
      });

  });
});
