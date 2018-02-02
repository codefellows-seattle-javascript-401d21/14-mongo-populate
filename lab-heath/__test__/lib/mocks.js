'use strict';

const faker = require('faker');
const Cat = require('../../model/cat');
const Owner = require('../../model/owner');

const mock = module.exports = {};

// Owner Mocks - One, Many, RemoveAll
mock.owner = {};

mock.owner.createOne = () => new Owner({ name: faker.hacker.adjective() }).save();

mock.owner.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.owner.createOne));

mock.owner.removeAll = () => Promise.all([Owner.remove()]);


// Cat Mocks - One, Many, RemoveAll
mock.cat = {};

mock.cat.createOne = () => {
  let result = {};

  return mock.owner.createOne()
    .then(owner => {
      result.owner = owner;
      return new Cat({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        color: faker.hacker.ingverb(),
        owner: owner._id.toString(),
      }).save();
    })
    .then(cat => result.cat = cat)
    .then(() => result);
};

mock.cat.createMany = n => {
  let result = {};
  return mock.owner.createOne()
    .then(owner => {
      result.owner = owner;
      let catProms = new Array(n).fill(0).map(() => new Cat({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        color: faker.hacker.ingverb(),
        owner: owner._id.toString(),
      }).save());
      return Promise.all(catProms);
    })
    .then(cats => result.cats = cats)
    .then(() => result);
    
};

mock.cat.removeAll = () => Promise.all([Cat.remove()]);