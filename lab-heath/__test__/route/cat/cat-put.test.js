'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
require('jest');

describe('PUT /api/v1/cat', function () {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.owner.removeAll);
  afterAll(mock.cat.removeAll);


  beforeAll(() => {
    return mock.cat.createOne()
      .then(res => {
        this.cat = res.cat;
        this.onwer = res.owner;
      });
  });

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/cat/${this.cat._id}`)
        .send({name: 'tiger'})
        .then(res => this.res = res);
    });

    it('should respond with a status of 204', () => {
      expect(this.res.status).toBe(204);
    });
    it('should update the make to bianchi in the database', () => {
      return superagent.get(`:4000/api/v1/bike/${this.cat._id}`)
        .then(res => expect(res.body.name).toBe('tiger'));
    });
    it('should have the same id', () => {
      return superagent.get(`:4000/api/v1/cat/${this.cat._id}`)
        .then(res => expect(res.body._id).toContain(this.cat._id));
    });
  });
  
  describe('invalid req/res PUT', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/cat/mihnigf`)
        .catch(res => this.resTest = res);
    });

    it('should respond with a status of 404', () => {
      expect(this.resTest.status).toBe(404);
    });
  });
});