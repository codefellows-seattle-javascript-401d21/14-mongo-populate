'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');


describe('GET', function() {

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterEach(mock.lang.removeAll);


  describe('GET /api/v1/language/:id', function () {

    describe('Valid input', () => {

      // create two languages to use in test
      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send({name: 'English'})
          .then(res => this.resOne = res);
      });

      // get it
      beforeAll(() => {
        return superagent.get(`:${process.env.PORT}/api/v1/language/${this.resOne.body._id}`)
          .then(res => this.getOne = res);
      });

      test(
        'should return http status 200',
        () => {
          expect(this.getOne.status).toBe(200);
        });

      test(
        'should contain name that has been created in test',
        () => {
          expect(this.getOne.body.name).toEqual('English');
        });

      test(
        'should contain language id that has been created in test',
        () => {
          expect(this.getOne.body._id.toString()).toEqual(this.resOne.body._id.toString());
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
          superagent.get(`:${process.env.PORT}/api/v1/language/12345`)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toEqual(404);
            });
        });
    });

  });

  // getAll
  describe('GET /api/v1/language', () => {

    describe('Valid input', function() {

      // create two languages to use in test
      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send('English')
          .then(res => this.resOne = res);
      });

      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send('Japanese')
          .then(res => this.resTwo = res);
      });

      // get all languages
      beforeAll(() => {
        return superagent.get(`:${process.env.PORT}/api/v1/language`)
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
