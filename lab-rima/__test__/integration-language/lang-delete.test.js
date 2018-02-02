'use strict';

const path = require('path');
require('dotenv').config({path: path.resolve(process.cwd(), '__test__/.test.env')});
const server = require('../../lib/server');
const superagent = require('superagent');
const mock = require('../lib/mock');


describe('DELETE', () => {

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterEach(mock.lang.removeAll);

  //delete specific one
  describe('DELETE /api/v1/language/:_id', () => {

    describe('Valid input', () => {

      // create two languages to use them in test
      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send({name: 'French'})
          .then(res => this.resOne = res);
      });

      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send({name: 'Spanish'})
          .then(res => this.resTwo = res);
      });

      // delete a record
      beforeAll(() => {
        return superagent.del(`:${process.env.PORT}/api/v1/language/${this.resOne.body._id}`)
          .then(res => this.delOne = res);
      });

      // try to get a record that has been deleted
      beforeAll(() => {
        return superagent.get(`:${process.env.PORT}/api/v1/language/${this.resOne.body._id}`)
          .then(res => this.getOne = res);
      });

      // try to get a not deleted record
      beforeAll(() => {
        return superagent.get(`:${process.env.PORT}/api/v1/language/${this.resTwo.body._id}`)
          .then(res => this.getTwo = res);
      });

      test(
        'should return http status 204',
        () => {
          expect(this.delOne.status).toBe(204);
        });

      test(
        'should actually delete a specific data',
        () => {
          expect(this.getOne.body).toBeNull();
        });

      test(
        'should not delete the other records',
        () => {
          expect(this.getTwo.status).toBe(200);
          expect(this.getTwo.body.name).toEqual('Spanish');
          expect(this.getTwo.body._id).toEqual(this.resTwo.body._id);
        });

    });

    describe('Invalid input', () => {
      test(
        'should return a status 404 if no item in database',
        () => {
          return superagent.delete(`:${process.env.PORT}/api/v1/language/12345`)
            .ok(res => res.status < 500)
            .catch(err => {
              expect(err.status).toBe(404);
            });
        });
    });

  });

  //delete all
/*  describe('DELETE /api/v1/language', () => {

    describe('Valid input', () => {

      // create two languages to use them in test
      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send({name: 'French'})
          .then(res => this.resOne = res)
      });

      beforeAll(() => {
        return superagent.post(`:${process.env.PORT}/api/v1/language`)
          .send({name: 'Spanish'})
          .then(res => this.resTwo = res)
      });

      // delete all data
      beforeAll(() => {
        return superagent.del(`:${process.env.port}/api/v1/language`)
          .then(res => console.log(res))//this.delAll = res);
      });

      // try to get all data
      beforeAll(() => {
        return superagent.get(`:${process.env.port}/api/v1/language`)
          .then(res => this.getAll = res);
      });

      test(
        'should return http status 200',
        () => {
          expect(this.delAll.status).toBe(200);
        });

      test(
        'should actually delete all data',
        () => {
          expect(this.getAll.body).toBeNull();
        });
    });
  });*/
});
