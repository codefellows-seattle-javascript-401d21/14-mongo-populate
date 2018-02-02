'use strict';

const Book = require('../../model/book');
require('jest');

let testBook;
new Book('A Christmas Carol', 'Dickins', 1843, 'fiction')
  .then(book => testBook = book);
console.log('testBook', testBook);

describe('Book module', () => {
  describe('Valid input', () => {
    it('should have a title, author, year, category', () => {
      expect(testBook).toHaveProperty('title');
      expect(testBook).toHaveProperty('author');
      expect(testBook).toHaveProperty('year');
      expect(testBook).toHaveProperty('category');
    });
  });

  describe('Invalid inpute')


});
