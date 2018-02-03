'use strict';

const Genre = require('./genre');
const mongoose = require('mongoose');
// const debug = require('debug')('http:model-book');

const Book = mongoose.Schema({
  'summary': { type: String },
  'genre': {type: String},
  'author' : { type: String, require: true },
  'title': { type: String, require: true },
}, {timestamps: true});

Book.pre('save', (next) => {
  Genre.findByID(this.genre)
    .then(genre => {
      genre.books = [...new Set(genre.books).add(this._id)];
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save book')));
});

// TODO: Need to Debug.
Book.post('remove', (doc, next) => {
  Genre.findByID(doc.genre)
    .then(genre => {
      genre.books = genre.books.filter(a => doc._id.toString() !== a.toString());
      genre.save;
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('book', Book);
