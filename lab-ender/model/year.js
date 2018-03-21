'use strict';

const mongoose = require('mongoose');

const Year = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  winners: [{type: mongoose.Schema.Types.ObjectId, ref: 'winner'}],
});

module.exports = mongoose.model('seasons', Year);
