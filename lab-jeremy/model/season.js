'use strict';

const mongoose = require('mongoose');

const Season = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  champs: [{type: mongoose.Schema.Types.ObjectId, ref: 'champ'}],
});

module.exports = mongoose.model('seasons', Season);