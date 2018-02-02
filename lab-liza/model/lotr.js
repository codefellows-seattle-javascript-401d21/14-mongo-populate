'use strict';

const mongoose = require('mongoose');

const LOTR = mongoose.Schema({
  'name': { type: String },
  'species': { type: String },
}, {timestamps: true});

module.exports = mongoose.model('lotr', LOTR);