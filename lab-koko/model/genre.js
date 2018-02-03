'use strict'; 
const mongoose = require('mongoose');

const Genre = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'books'}],
});

module.exports = mongoose.model('genre', Genre);