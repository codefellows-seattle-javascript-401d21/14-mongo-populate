'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');
const faker = require('faker');


describe('POST /api/v1/book', () => {

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  // delete all data after all tests
  afterAll(() => mock.lang.removeAll);
  afterAll(() => mock.book.removeAll);


  describe('Valid req/res', () => {

    // create a new book with a new language to use it in test
    beforeAll(() => {
      return mock.lang.createOne('English')
        .then(lang => this.mockLang = lang)
        .then(() => {
          this.mockBook = {
            title: faker.hacker.ingverb(),
            author: faker.hacker.noun(),
            language: this.mockLang._id,
          }

          return superagent.post(`:${process.env.PORT}/api/v1/book`)
            .send(this.mockBook)
            .then(res => this.res = res);
        })
    });

    test(
      'should respond with http res status 201',
      () => {
        expect(this.res.status).toBe(201);
      });

    test(
      'should create a new book with correct data',
      () => {
        expect(this.res.body.title).toEqual(this.mockBook.title);
        expect(this.res.body.author).toEqual(this.mockBook.author);
        expect(this.res.body.language).toEqual(this.mockLang._id.toString());
      });

    test(
      'should have an _id property on the response object',
      () => {
        expect(this.res.body).toHaveProperty('_id');
      });
  });

  describe('Invalid req/res', () => {

    test(
      'should not accept invalid input',
      () => {
        superagent.post(`:${process.env.PORT}/api/v1/book`)
          .ok(res => res.status < 500)
          .send({author: 'au'})
          .catch(err => expect(err.status).not.toBe(201));
      });

  });
});
