'use strict'

const faker = require('faker')
const Make = require('../../model/make')
const Model = require('../../model/model')

const mock = module.exports = {}

// Make Mocks - One, Many, RemoveAll
mock.make = {}

mock.make.createOne = () => new Make({ name: faker.hacker.adjective() }).save()

mock.make.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.make.createOne))

mock.make.removeAll = () => Promise.all([Make.remove()])


// Model Mocks - One, Many, RemoveAll
mock.model = {}

mock.model.createOne = () => {
  let result = {}

  return mock.make.createOne()
    .then(make => {
      result.make = make
      return new Model({
        title: `${faker.name.firstName()} ${faker.name.lastName()}`,
        year: faker.hacker.ingverb(),
        make: make._id.toString(),
      }).save()
    })
    .then(model => result.model = model)
    .then(() => result)
}

mock.model.createMany = n => {
  let result = {}

  return mock.make.createOne()
    .then(make => {
      result.make = make
      let modelProms = new Array(n).fill(0).map(() => new Model({
        title: `${faker.name.firstName()} ${faker.name.lastName()}`,
        year: faker.hacker.ingverb(),
        make: make._id.toString(),
      }).save())
      return Promise.all(modelProms)
    })
    .then(models => result.models = models)
    .then(() => result)
}

mock.model.removeAll = () => Promise.all([Model.remove()])