'use strict';

const faker = require('faker');
const Lang = require('../../model/language');
const Book = require('../../model/book');

const mock = module.exports = {};


// Language mock - Mock create one, remove all
mock.lang = {};

// create a specific language data
mock.lang.createOne = (l) => {
  return new Lang({name: l}).save();
};

// remove all data, not schema itself
mock.lang.removeAll = () => Promise.all([Lang.remove()]);


// Book mock - Mock create one, many, remove al
mock.book = {};

mock.book.createOne = (l) => {
  let result = {};

  return mock.lang.createOne(l)
    .then(lang => {
      result.language = lang;
      return new Book({
        title: `${faker.hacker.ingverb()}`,
        author: `${faker.name. firstName()} ${faker.name.lastName()}`,
        language: lang._id.toString(),
      })
        .save();
    })
    .then(book => result.track = book)
    .then(() => result);
};

mock.book.createMany = n => {
  let result = {};

  return mock.lang.createOne(l)
    .then(lang => {
      result.lang = lang;
      let bookProms = new Array(n).fill(0).map(() => {new Book({
        title: `${faker.hacker.ingverb()}`,
        author: `${faker.name. firstName()} ${faker.name.lastName()}`,
        language: lang._id.toString(),
      })
        .save();});
      return Promise.all(bookProms);
    })
    .then(books => result.books = books)
    .then(() => result);
};

mock.book.removeAll = () => Promise.all([Book.remove()]);
