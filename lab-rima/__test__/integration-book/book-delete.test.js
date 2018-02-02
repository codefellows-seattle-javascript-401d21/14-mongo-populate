'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');
const faker = require('faker');


describe('DELETE', () => {

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  //delete specific one
  describe('DELETE /api/v1/book/:_id', () => {

    let postOne, postTwo, getTwo, deleteOne;

    // create a book to use them in test
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/book`)
        .send({title: 'Test', author: 'Testing'})
        .then(res => postOne = res);
    });

    // create another record
    beforeAll(()  => {
      return superagent.post(`:${process.env.PORT}/api/v1/book`)
        .send({title: 'Test2', author: 'Testing2'})
        .then(res => postTwo = res);
    });

    // delete a record
    beforeAll(() => {
      return superagent.del(`:${process.env.PORT}/api/v1/book/${postOne.body._id}`)
        .then(res => deleteOne = res);
    });

    // try to get a record that has been deleted
    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/book/${postOne.body._id}`);
    });

    // try to get a record that should exist
    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/book/${postTwo.body._id}`)
        .then(res => getTwo = res);
    });

    // delete all data
    afterAll(() => {
      return superagent.delete(`:${process.env.PORT}/api/v1/book`);
    });

    describe('Valid input', () => {

      test(
        'should not delete the other records',
        () => {
          expect(getTwo.status).toBe(200);
          expect(getTwo.body.title).toEqual('Test2');
          expect(getTwo.body.author).toEqual('Testing2');
        });

      test(
        'should return http status 204',
        () => {
          expect(deleteOne.status).toBe(204);
        });
    });

    describe('Invalid input', () => {
      test(
        'should return a status 404 if no item in database',
        () => {
          return superagent.delete(`:${process.env.PORT}/api/v1/book/12345`)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toBe(404);
            });
        });
    });

  });

  //delete all
  describe('DELETE /api/v1/book', () => {
    let deleteAll;

    // create two books to use them in test
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/book`)
        .send({title: 'Test', author: 'Testing'})
        .then(res => res);
    });

    // create another record
    beforeAll(()  => {
      return superagent.post(`:${process.env.PORT}/api/v1/book`)
        .send({title: 'Test2', author: 'Testing2'})
        .then(res => res);
    });

    // delete a record
    beforeAll(() => {
      return superagent.del(`:${process.env.PORT}/api/v1/book`)
        .then(res => deleteAll = res);
    });

    // delete all data
    afterAll(() => {
      return superagent.delete(`:${process.env.PORT}/api/v1/book`);
    });

    describe('Valid input', () => {

      test(
        'should return http status 200',
        () => {
          expect(deleteAll.status).toBe(200);
        });

    });
  });
});
