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
  afterEach(mock.book.removeAll);


  describe('Valid input', () => {

    // First new book
    // post an existing book to use it in test
    beforeAll(() => {
      return mock.lang.createOne('French')
        .then(lang => this.mockLang = lang)
        .then(() => {
          this.mockBook = {
            title: faker.hacker.ingverb(),
            author: faker.hacker.noun(),
            language: this.mockLang._id,
          };

          return superagent.post(`:${process.env.PORT}/api/v1/book`)
            .send(this.mockBook)
            .then(res => this.postOne = res);
        });
    });

    // update an existing book to use it in test
    beforeAll(() => {
      return superagent.put(`:${process.env.PORT}/api/v1/book/${this.postOne.body._id}`)
        .send({ title: 'Update' })
        .then(res => this.putOne = res);
    });

    // get an existing book to use it in test
    beforeAll(() => {
      return superagent.get(`:${process.env.PORT}/api/v1/book/${this.postOne.body._id}`)
        .then(res => this.getOne = res);
    });

    test(
      'should respond with http res status 204',
      () => {
        expect(this.putOne.status).toBe(204);
      });

    test(
      'should update only title when put request is sent with new title only',
      () => {
        expect(this.getOne.body.title).toEqual('Update');
        expect(this.getOne.body.author).toEqual(this.mockBook.author);
      });
  });

  describe('Invalid input', () => {

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
