'use strict';

const Author = require('./author');
const mongoose = require('mongoose');
const debug = require('debug')('http:model-book');

debug('Book schema');

const Book = mongoose.Schema({
  'title': {  type: String, required: true },
  'year': { type: Number},
  author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'author'},
}, {timestamps: true});

Book.pre('save"', function(next) {
  Author.findById(this.album)
    .then(author => {
      author.books = [...new Set(author.books).add(this._id)];
      author.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error.  Failed to save Book.')));
});

Book.post('remove', function(doc, next) {
  Author.findById(doc.author)
    .then(author => {
      author.books = author.books.filter(a => a.toString() !== doc._id.toString());
      author.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('books', Book);
