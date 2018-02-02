'use strict';

const faker = require('faker');
const Season = require('../../model/season');
const Champ = require('../../model/champ');

const mock = module.exports = {};

// Season Mocks - One, Many, RemoveAll
mock.season = {};

mock.season.createOne = () => new Season({ name: faker.hacker.adjective() }).save();

mock.season.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.season.createOne));

mock.season.removeAll = () => Promise.all([Season.remove()]);


// Champ Mocks - One, Many, RemoveAll
mock.champ = {};

mock.champ.createOne = () => {
  let result = {};

  return mock.season.createOne()
    .then(season => {
      result.season = season;
      return new Champ({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        season: season._id.toString(),
      }).save();
    })
    .then(champ => result.champ = champ)
    .then(() => result);
};

mock.champ.createMany = n => {
  let result = {};

  return mock.season.createOne()
    .then(season => {
      result.season = season;
      let champProms = new Array(n).fill(0).map(() => new Champ({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        season: season._id.toString(),
      }).save());
      return Promise.all(champProms);
    })
    .then(champs => result.champs = champs)
    .then(() => result);
};

mock.champ.removeAll = () => Promise.all([Champ.remove()]);