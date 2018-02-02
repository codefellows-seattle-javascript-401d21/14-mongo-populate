'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
const mocks = require('../lib/mocks')
const faker = require('faker')
require('jest')

describe('POST /api/v1/model', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/model`)
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(mocks.make.removeAll)
  afterEach(mocks.model.removeAll)

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.make.createOne()
        .then(make => this.mockMake = make)
        .then(() => {
          this.fakeModel = {
            title: faker.hacker.ingverb(),
            artist: faker.hacker.noun(),
            make: this.mockMake._id,
          }

          return superagent.post(`${this.base}`)
            .send(this.fakeModel)
            .then(res => this.response = res)
        })
    })

    it('should return a status of 201', () => {
      expect(this.response.status).toEqual(201)
    })
    it('should return a new model instance', () => {
      expect(this.response.body).toHaveProperty('_id')
    })
  })

  describe('inValid requests', () => {
    it('should return a status 400 given no request body', () => {
      return superagent.post(`${this.base}`)
        .send()
        .catch(err => expect(err.status).toEqual(400))
    })
    it('should return a status 400 given an improperly formatted body', () => {
      return superagent.post(`${this.base}`)
        .send({gnarf: 200})
        .catch(err => expect(err.status).toEqual(400))
    })
  })
})