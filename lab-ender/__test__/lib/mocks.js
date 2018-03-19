'use strict';

const faker = require('faker');
const Year = require('../../model/year');
const Winner = require('../../model/winner');

const mock = module.exports = {};

// Year Mocks - One, Many, RemoveAll
mock.year = {};

mock.year.createOne = () => new Year({ name: faker.hacker.adjective() }).save();

mock.year.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.year.createOne));

mock.year.removeAll = () => Promise.all([Year.remove()]);


// winner Mocks - One, Many, RemoveAll
mock.winner = {};

mock.winner.createOne = () => {
  let result = {};

  return mock.year.createOne()
    .then(year => {
      result.year = year;
      return new Winner({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        year: year._id.toString(),
      }).save();
    })
    .then(winner => result.winner = winner)
    .then(() => result);
};

mock.winner.createMany = n => {
  let result = {};

  return mock.year.createOne()
    .then(year => {
      result.year = year;
      let winnerProms = new Array(n).fill(0).map(() => new Winner({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        year: year._id.toString(),
      }).save());
      return Promise.all(winnerProms);
    })
    .then(winners => result.winners = winners)
    .then(() => result);
};

mock.winner.removeAll = () => Promise.all([winner.remove()]);
