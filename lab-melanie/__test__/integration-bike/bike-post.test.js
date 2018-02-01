'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
const Bike = require('../../model/bike.js');

require('jest');

describe('POST', function() {
  this.mockBike = {year: '2010', color: 'blue', make: 'bianchi', category: 'road bike'};
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => Promise.all([Bike.remove()]));


  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/bike')
        .send(this.mockBike)
        .then(res => this.response = res);
    });
    it('should post a new note with make, year, and _id', () => {
      expect(this.response.body).toHaveProperty('make');
      expect(this.response.body).toHaveProperty('year');
      expect(this.response.body).toHaveProperty('_id');
    });
    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should respond with a year and color', () => {
      expect(this.response.body.year).toEqual(2010);
      expect(this.response.body.color).toBe(this.mockBike.color);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesnotexist')
        .send(this.mockNote)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on a bad request body', () => {
      return superagent.post(':4000/api/v1/bike')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});