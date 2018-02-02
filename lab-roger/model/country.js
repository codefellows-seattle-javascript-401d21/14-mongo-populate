'use strict';

const mongoose = require('mongoose');




const Country = mongoose.Schema({
  name: {type: String, required: true},
  continent: {type: String},
  language: {type: String},
  population: {type: Number},
  city: [{type: mongoose.Schema.Types.ObjectId, ref: 'city'}],
}, {timestamps: true});


module.exports = mongoose.model('country', Country);
