'use strict';

const faker = require('faker');
const Type = require('../../model/type');
const Star = require('../../model/star');

const mock = module.exports = {};

//Type Mocks - One, Many, RemoveAll
mock.type = {};

mock.type.createOne = () => new Type({name: faker.hacker.noun()}).save();

mock.type.createMany = n => Promise.all(new Array(n).fill(0).map(mock.type.createOne));

mock.type.removeAll = () => Promise.all([Type.remove()]);

//Star Mocks - One, Many, RemoveAll
mock.star = {};

mock.star.createOne = () => {
  let result = {};

  return mock.type.createOne()
    .then(type => {
      result.type = type;
      return new Star({
        starName: faker.hacker.adjective(),
        starType: type._id.toString(),
      }).save();
    })
    .then(star => result.star = star)
    .then(() => result);
};

mock.star.createMany = n => {
  let result = {};

  return mock.type.createOne()
    .then(type => {
      result.type = type;
      let starProms = new Array(n).fill(0).map(() => new Star({
        starName: faker.hacker.ingverb(),
        starType: type._id,
      }).save());
      return Promise.all(starProms);
    })
    .then(stars => result.stars = stars)
    .then(() =>  result);
};

mock.star.removeAll = () => Promise.all([Star.remove()]);