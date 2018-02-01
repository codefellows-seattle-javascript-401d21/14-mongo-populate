'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
require('jest');
const PORT = process.env.PORT;

describe('Route-student module', function() {
  this.ep = `:${PORT}/api/v1`;
  // Start the server
  beforeAll(() => server.start(process.env.PORT, (err) => {
    if (err) {
      console.error(`Error Starting Server: ${err}`);
      return;
    }
    console.log(`Listening on PORT ${process.env.PORT}`);
  }));
  // Stop the server
  afterAll(() => server.stop());

  describe('Invalid GET request using fakepath', () => {
    describe('GET /fakepath', () => {
      it('should respond with 404 status when a /fakepath is used', () => {
        return superagent.get(`${this.ep}/fakepath`)
          .catch(err => expect(err.status).toBe(404));
      });
    });
  });

  describe('Valid GET request', () => {
    describe('GET /student', () => {
      it('should respond with 200 status', () => {
        return superagent.get(`${this.ep}/student`)
          .then(res => expect(res.status).toBe(200));
      });
    });
  });

  describe('Invalid POST request', () => {
    describe('POST /student', () => {
      it('should respond with a status 404 when :_id is not provided', () => {
        return superagent.post(`${this.ep}/student`)
          .catch(err => expect(err.status).toBe(404));
      });
    });
  });

  describe('Valid POST request, ', () => {
    describe('POST /student/:_id', () => {
      it('should respond with 201 status', () => {
        return superagent.post(`${this.ep}/student/`)
          .send({full_name: 'Steve', age: 30})
          .then(res => expect(res.status).toBe(201));
      });
    });
  });

  describe('Invalid PUT request', () => {
    describe('PUT /student', () => {
      it('should respond with 404 status when no :_id is provided', () => {
        return superagent.put(`${this.ep}/student`)
          .catch(err => expect(err.status).toBe(404));
      });
    });
  });

  describe('Valid PUT request', () => {
    describe('PUT /student/:_id', () => {
      it('should respond with a status 204 following a successful PUT request', () => {
        let id;
        return superagent.post(`${this.ep}/student`)
          .send({full_name: 'George', age: 44})
          .then(res => id = res.body._id)
          .then(() => {
            return superagent.put(`${this.ep}/student/${id}`)
              .send({full_name: 'Graham', age: 17})
              .then(res => expect(res.status).toBe(204));
          });
      });
    });
  });

  describe('Invalid DELETE request', () => {
    describe('DELETE /student', () => {
      it('should respond with a status 404 when given a delete request without an :_id in the URL', () => {
        return superagent.delete(`${this.ep}/student`)
          .catch(err => expect(err.status).toBe(404));
      });
    });
  });

  describe('Valid DELETE Request', () => {
    describe('DELETE /student/:_id', () => {
      it('should respond with a status 204 on a successful deletion', () => {
        let id;
        return superagent.post(`${this.ep}/student`)
          .send({full_name: 'Joe', age: 4})
          .then(res => id = res.body._id)
          .then(() => {
            return superagent.delete(`${this.ep}/student/${id}`)
              .then(res => expect(res.status).toBe(204));
          });
      });
    });
  });
});
