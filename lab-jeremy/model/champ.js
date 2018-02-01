'use strict';

const mongoose = require('mongoose');

const Champ = mongoose.Schema({
  'name': { type: String, required: true },
  'type': { type: String, required: true },
  'main_lane': { type: String, required: true },
  'winrate_percent': { type: Number, required: true },
},  {timestamps: true});

module.exports = mongoose.model('champs', Champ);