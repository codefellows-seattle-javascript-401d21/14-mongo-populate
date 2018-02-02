'use strict';

const mongoose = require('mongoose');
//const Book = require('./book');

const Language = mongoose.Schema({
  name : { type: String, require: true },
  books : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });

module.exports = mongoose.model('languages', Language);
