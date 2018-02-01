'use strict';

const mongoose = require('mongoose');

const Type = mongoose.Schema({
  name: {type: String, max: 10},
  stars: [{type: mongoose.Schema.Types.ObjectId, ref: 'star'}],
});

module.exports = mongoose.model('star_types', Type);