'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');


describe('PUT /', () => {

  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('Valid input', () => {
    let postOne, putOne, getOne;

    // First new book
    // post an existing book to use it in test
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/book`)
        .send({ title: 'Test', author: 'Testing' })
        .then(res => { postOne = res; });
    });

    // update an existing book to use it in test
    beforeAll(() => {
      return superagent.put(`:${process.env.PORT}/api/v1/book/${postOne.body._id}`)
        .send({ title: 'Update' })
        .then(res => { putOne = res; });
    });

    // get an existing book to use it in test
    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/book/${postOne.body._id}`)
        .then(res => { getOne = res; });
    });

    // delete all data
    afterAll(() => {
      return superagent.del(`:${process.env.PORT}/api/v1/book`);
    });

    test(
      'should update only title when put request is sent with new title only',
      () => {
        expect(getOne.body.title).toEqual('Update');
        expect(getOne.body.author).toEqual('Testing');
      });

    test(
      'should respond with http res status 204',
      () => {
        expect(putOne.status).toBe(204);
      });
  });

  describe('Invalid input', () => {
    let postTwo;

    // post an existing book to use it in test
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/book`)
        .send({ title: 'Test2', author: 'Testing2' })
        .then(res => { postTwo = res; });
    });

    // get an existing book to use it in test
    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/book/${postTwo.body._id}`);
    });
    
    // delete all data
    afterAll(() => {
      return superagent.del(`:${process.env.PORT}/api/v1/book`);
    });

    test(
      'should return a status 404 if item not found',
      () => {
        return superagent.put(`:${process.env.PORT}/api/v1/book/12345`)
          .ok(res => res.status < 500)
          .catch(err => {
            expect(err.status).toEqual(404);
          });
      });

  });
});
