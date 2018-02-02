'use strict';

const faker = require('faker');
const Country = require('../../model/country');
const City = require('../../model/city');

const mock = module.exports = {};

// Album Mocks - One, Many, RemoveAll
mock.country = {};

mock.country.createOne = () => new Country({ name: faker.address.country()}).save();

mock.country.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.country.createOne));

mock.country.removeAll = () => Promise.all([Country.remove()]);


// Track Mocks - One, Many, RemoveAll
mock.city = {};

mock.city.createOne = () => {
  let result = {};

  return mock.country.createOne()
    .then(country => {
      result.country = country;
      return new City({
        name: faker.address.city(),
     
        country: country._id.toString(),
      }).save();
    })
    .then(city => result.city = city)
    .then(() => result);
};

mock.city.createMany = n => {
  let result = {};

  return mock.country.createOne()
    .then(country => {
      result.country = country;
      let cityProms = new Array(n).fill(0).map(() => new City({
        name: faker.address.country(),
        continent: faker.commerce.color(),
        country: country._id.toString(),
      }).save());
      return Promise.all(cityProms);
    })
    .then(city => result.city = city)
    .then(() => result);
};

mock.city.removeAll = () => Promise.all([City.remove()]);