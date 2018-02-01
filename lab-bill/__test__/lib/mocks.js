'use strict'

const faker = require('faker')
const Farm = require('../../model/farm')
const Animal = require('../../model/animal')

const mock = module.exports = {}

// Album Mocks - One, Many, RemoveAll
mock.farm = {}

mock.farm.createOne = () => new Farm({ name: faker.hacker.adjective() }).save()

mock.farm.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.farm.createOne))

mock.farm.removeAll = () => Promise.all([Farm.remove()])


// Track Mocks - One, Many, RemoveAll
mock.animal = {}

mock.animal.createOne = () => {
  let result = {}

  return mock.farm.createOne()
  .then(farm => {
    result.farm = farm
    return new Animal({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      class: faker.hacker.ingverb(),
      farm: farm._id.toString(),
    }).save()
  })
  .then(animal => result.animal = animal)
  .then(() => result)
}

mock.animal.createMany = n => {
  let result = {}

  return mock.farm.createOne()
  .then(farm => {
    result.farm = farm
    let animalProms = new Array(n).fill(0).map(() => new Animal({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      class: faker.hacker.ingverb(),
      farm: farm._id.toString(),
    }).save())
    return Promise.all(animalProms)
  })
  .then(animals => result.animals = animals)
  .then(() => result)
}

mock.animals.removeAll = () => Promise.all([Animal.remove()])