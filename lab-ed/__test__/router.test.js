'use strict'

const superagent = require('superagent')
const server = require('../lib/server');
require('jest');
const PORT = process.env.PORT

describe('Route-mc module', function() {
  beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
  afterAll(() => server.stop())


  describe('Bad Request GET, invalid get schema', () => {
    describe('GET /imBad', () => {
      it('should respond with a status 404', () => {
        return superagent.get(':4000/api/v1/imBad')
          .catch(err => {
            expect(err.status).toBe(404)
          })
      })
    })
  })

  describe('Valid Request to the GET API', () => {
    describe('GET /mc', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4000/api/v1/mc')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
    })
  })

  describe('Bad Request POST, missing ID', () => {
    describe('POST /mc', () => {
      it('should respond with a status 404', () => {
        return superagent.post(':4000/api/v1/mc')
          .catch(err => {
            expect(err.status).toBe(404)
          })
      })
    })
  })
      
  describe('Valid Request to the POST API, ', () => {
    describe('POST /mc/id', () => {
      it('should respond with a status 201', () => {
        return superagent.post(':4000/api/v1/mc/')
          .send({make: 'Honda', model: 'CBX'})
          .then(res => {
            expect(res.status).toBe(201)
          })
      })
    })
  })

  describe('Bad Request PUT, no ID', () => {
    describe('PUT /mc', () => {
      it('should respond with a status 404', () => {
        return superagent.put(':4000/api/v1/mc')
          .catch(err => {
            expect(err.status).toBe(404)
          })
      })
    })
  })

  describe('Valid Request to the PUT API', () => {
    describe('PUT /mc', () => {
      it('should respond with a status 204', () => {
        return superagent.put(':4000/api/v1/mc')
          .send({id: '5a725ad720af541da254b801', make: 'Bultaco', model: 'Tralla'})
          .then(res => {
            expect(res.status).toBe(204)
          })
      })
    })
  })

  describe('Bad Request DELETE, no ID', () => {
    describe('DELETE /mc', () => {
      it('should respond with a status 404', () => {
        return superagent.delete(':4000/api/v1/mc')
          .catch(err => {
            expect(err.status).toBe(404)
          })
      })
    })
  })

  describe('Valid Request to the DELETE API', () => {
    describe('DELETE /mc', () => {
      it('should respond with a status 204', () => {
        return superagent.delete(':4000/api/v1/mc/5a725c8d20af541da254b808')
          .send({id: '5a725c8d20af541da254b808'})
          .then(res => {
            expect(res.status).toBe(204)
          })
      })
    })
  })
})
