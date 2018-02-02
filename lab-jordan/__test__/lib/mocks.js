'use strict'

const faker = require('faker')
const Species = require('../../model/species')
const Tolkien = require('../../model/tolkien')

const mock = module.exports = {}

// Species Mocks - One, Many, RemoveAll
mock.species = {}

mock.species.createOne = () => new Species({ name: faker.hacker.adjective() }).save()

mock.species.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.species.createOne))

mock.species.removeAll = () => Promise.all([Species.remove()])


// Tolkien Mocks - One, Many, RemoveAll
mock.tolkien = {}

mock.tolkien.createOne = () => {
  let result = {}

  return mock.species.createOne()
  .then(species => {
    result.species = species
    return new Tolkien({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      species: species._id.toString(),
    }).save()
  })
  .then(tolkien => result.tolkien = tolkien)
  .then(() => result)
}

mock.tolkien.createMany = n => {
  let result = {}

  return mock.species.createOne()
  .then(species => {
    result.species = species
    let tolkienProms = new Array(n).fill(0).map(() => new Tolkien({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      species: species._id.toString(),
    }).save())
    return Promise.all(tolkienProms)
  })
  .then(tolkiens => result.tolkiens = tolkiens)
  .then(() => result)
}

mock.tolkien.removeAll = () => Promise.all([Tolkien.remove()])
