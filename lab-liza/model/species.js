'use strict';

const mongoose = require('mongoose');

const Species = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  lotrs: [{type: mongoose.Schema.Types.ObjectId, ref: 'lotr'}],
});

module.exports = mongoose.model('species', Species);

