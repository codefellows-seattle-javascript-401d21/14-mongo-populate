'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');
const faker = require('faker');


describe('GET', function() {

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterEach(mock.lang.removeAll);
  afterEach(mock.book.removeAll);


  describe('GET /api/v1/note/:id', function () {

    describe('Valid input', () => {

      // create two books to use in test
      beforeAll(() => {
        return mock.lang.createOne('English')
          .then(lang => this.mockLangOne = lang)
          .then(() => {
            this.mockBookOne = {
              title: faker.hacker.ingverb(),
              author: faker.hacker.noun(),
              language: this.mockLangOne._id,
            }

            return superagent.post(`:${process.env.PORT}/api/v1/book`)
              .send(this.mockBookOne)
              .then(res => this.resOne = res);
          })
      });

      // get this.mockBookOne
      beforeAll(() => {
        return superagent.get(`:${process.env.PORT}/api/v1/book/${this.resOne.body._id}`)
          .then(res => this.getOne = res);
      });

      test(
        'should return http status 200',
        () => {
          expect(this.getOne.status).toBe(200);
        });

      test(
        'should contain title/author that has been created in test',
        () => {
          expect(this.getOne.body.title).toEqual(this.mockBookOne.title);
          expect(this.getOne.body.author).toEqual(this.mockBookOne.author);
        });

      test(
        'should contain language id that has been created in test',
        () => {
          expect(this.getOne.body.language).toEqual(this.mockLangOne._id.toString());
        });
    });

    describe('Invalid input', () => {
 
      test(
        'should throw an error if schema is invalid',
        () => {
          superagent.get(`:${process.env.PORT}/api/v1/bo/${this.resOne.body._id}`)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
              expect(err.message).toBe('Path Error.');
            });
        });

      test(
        'should throw an error if item does not exist',
        () => {
          superagent.get(`:${process.env.PORT}/api/v1/book/12345`)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
            });
        });
    });

  });

  // getAll
  describe('GET /api/v1/book', () => {

    describe('Valid input', function() {

      // create two books to use in test
      beforeAll(() => {
        return mock.lang.createOne('English')
          .then(lang => this.mockLangOne = lang)
          .then(() => {
            this.mockBookOne = {
              title: faker.hacker.ingverb(),
              author: faker.hacker.noun(),
              language: this.mockLangOne._id,
            }

            return superagent.post(`:${process.env.PORT}/api/v1/book`)
              .send(this.mockBookOne)
              .then(res => this.resOne = res);
          })
      });

      beforeAll(() => {
        return mock.lang.createOne('Japanese')
          .then(lang => this.mockLangTwo = lang)
          .then(() => {
            this.mockBookTwo = {
              title: faker.hacker.ingverb(),
              author: faker.hacker.noun(),
              language: this.mockLangTwo._id,
            }

            return superagent.post(`:${process.env.PORT}/api/v1/book`)
              .send(this.mockBookTwo)
              .then(res => this.resTwo = res);
          })
      });

      // get all books
      beforeAll(() => {
        return superagent.get(`:${process.env.PORT}/api/v1/book`)
          .then(res => this.getAll = res);
      });

      test(
        'should return http status 200',
        () => {
          expect(this.getAll.status).toBe(200);
        });

      test(
        'should contain two ids that have been created in test',
        () => {
          let ids = [];
          for(let i = 0; i < this.getAll.body.length; i++){
            ids.push(this.getAll.body[i]._id);
          }
          expect(ids.includes(this.resOne.body._id)).toBeTruthy();
          expect(ids.includes(this.resTwo.body._id)).toBeTruthy();
        });
    });

    describe('Invalid input', () => {

      test(
        'should throw an error if schema is invalid',
        () => {
          superagent.get(`:${process.env.PORT}/api/v1/bo`)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
              expect(err.message).toBe('Path Error.');
            });
        });

    });
  });
});
