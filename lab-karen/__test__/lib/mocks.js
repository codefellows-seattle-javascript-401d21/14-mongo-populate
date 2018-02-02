'use strict';

const faker = require('faker');
const Author = require('../../model/author');
const Book = require('../../model/book');

const mock = module.exports = {};

//Author mocks
mock.author = {};

mock.author.createOne = () => new Author({ name: `${faker.name.firstName()} ${faker.name.lastName()}`}).save();

mock.author.createMany = n => Promise.all(new Array(n).fill(0).map(mock.author.createOne));

mock.author.removeAll = () => Promise.all([Author.remove()]);

//Book mocks

mock.book = {};

mock.book.createOne = () => {
  let result = {};

  return mock.author.createOne()
    .then (author => {
      result.author = author;
      return new Book({
        title: faker.hacker.ingverb(),
        year: faker.random.number({
          'min': 1850,
          'max': 2018,
        }),
        author: author.toString(),
      }).save();
    })
    .then(book => result.book = book)
    .then(() => result);
};

mock.book.createMany = n => {
  let result = {};

  return mock.author.createOne ()
    .then(author => {
      result.author = author;
      let bookProms = new Array(n).fill(0).map(() => new Book ({
        title: faker.hacker.ingverb(),
        year: faker.random.number({
          'min': 1850,
          'max': 2018,
        }),
        author: author.toString(),
      }).save());
      return Promise.all(bookProms);
    })
    .then(books => result.books = books)
    .then(() => result);
};

mock.book.removeAll = () => Promise.all([Book.remove()]);
