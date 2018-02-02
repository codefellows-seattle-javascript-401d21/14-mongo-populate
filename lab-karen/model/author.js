'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('http:model-author');

debug('Author schema');

const Author = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  book: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}],
});

module.exports = mongoose.model('authors', Author);
