'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
const mocks = require('../lib/mocks')
const faker = require('faker')
require('jest')

describe('DELETE /api/v1/model', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/make`)
  beforeAll(server.start)
  afterAll(server.stop)

  describe('Valid requests', () => {
    beforeAll(() => {
      return mocks.make.createOne()
        .then(make => this.mockMake = make)
        .then(() => {
          this.fakeModel = {
            name: faker.hacker.ingverb(),
            year: faker.hacker.noun(),
            make: this.mockMake._id,
          }

          return superagent.post(`${this.base}`)
            .send(this.fakeModel)
            .then(res => this.response = res)
        })
    })

    it('should return a status 204 on successful deletion', () => {
      console.log(this.base)
      console.log(this.mockMake._id)
      return superagent.delete(`${this.base}/${this.response.body._id}`)
      //return superagent.delete(`${this.base}/${this.mockMake._id}`)
        .then(res => expect(res.status).toEqual(204))
    })
  })

  describe('inValid requests', () => {
    it('should return a 404 given an invalid ID', () => {
      return superagent.delete(`${this.base}/1234`)
        .catch(err => expect(err.status).toEqual(404))
    })
  })
})