'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('POST /api/v1/track', function () {
  beforeAll(() => this.mockTrack = { title: 'Been Broke Before', artist: 'YFN LUCCI' })
  beforeAll(() => server.start())
  afterAll(() => server.stop())

  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/track`)
        .send(this.mockTrack)
        .then(res => this.response = res)
    })
    it('should return a status code of 201 CREATED', () => {
      expect(this.response.status).toBe(201)
    })
  })
  describe('invalid request', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/track`)
        .send(this.mockTrack)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/Path Error/i); //(/path error/ i) regex check
        });
      it('should retrun a status 400 on bad request body', () => {
        return superagent.post(`:${process.env.PORT}/api/v1/track`)
          .send({})
          .catch(err => expect(err.status).toBe(400));
      });
    })
  })
})

//implement
