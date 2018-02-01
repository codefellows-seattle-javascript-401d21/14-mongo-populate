'use strict';

const mongoose = require('mongoose');

const Rider = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  bikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'bike'}],
});

module.exports = mongoose.model('riders', Rider);