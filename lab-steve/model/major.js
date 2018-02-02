'use strict';

const mongoose = require('mongoose');

const Major = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'student'}],
});

module.exports = mongoose.model('major', Major);

