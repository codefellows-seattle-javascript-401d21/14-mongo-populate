'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
const mocks = require('../lib/mocks')
const faker = require('faker')
require('jest')

describe('GET /api/v1/model', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/model`)
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(mocks.make.removeAll)
  afterEach(mocks.model.removeAll)

  // describe('Valid requests', () => {
  //   beforeAll(() => {
  //     return mocks.model.createMany(25)
  //       .then(results => this.modelData = results)
  //   })

  //   it('should return an array of IDs given no ID parameter in the route', () => {
  //     return superagent.get(`${this.base}`)
  //       .then(res => {
  //         expect(res.body).toBeInstanceOf(Array)
  //         expect(res.body.includes(this.modelData.models[0]._id.toString())).toBeTruthy()
  //         expect(res.body.includes(this.modelData.models[10]._id.toString())).toBeTruthy()
  //         expect(res.body.includes(this.modelData.models[18]._id.toString())).toBeTruthy()
  //       })
  //   })
      
  //   it('should return a status 200', () => {
  //     return superagent.get(`${this.base}`)
  //       .then(res => expect(res.status).toEqual(200))
  //   })

  //   it('should return a status 200 given a valid ID', () => {
  //     return superagent.get(`${this.base}/${this.modelData.models[0]._id}`)
  //       .then(res => expect(res.status).toEqual(200))
  //   })
  //   it('should return the correct data from a given objects ID', () => {
  //     return superagent.get(`${this.base}/${this.modelData.models[0]._id}`)
  //       .then(res => {
  //         expect(res.body._id).toEqual(this.modelData.models[0]._id)
  //         expect(res.body.name).toEqual(this.modelData.models[0].name)
  //         expect(res.body.year).toEqual(this.modelData.models[0].year)
  //       })
  //   })

  describe('inValid requests', () => {
    it('should return a status 400 given no request body', () => {
      return superagent.get(`${this.base}`)
        .send()
        .catch(err => expect(err.status).toEqual(400))
    })
    it('should return a status 400 given an improperly formatted body', () => {
      return superagent.get(`${this.base}`)
        .send({gnarf: 200})
        .catch(err => expect(err.status).toEqual(400))
    })
  })
})   
