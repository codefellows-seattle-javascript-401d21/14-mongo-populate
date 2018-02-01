'use strict';

const mongoose = require('mongoose');
const Rider = require('./rider.js');

const Bike = mongoose.Schema({
  'year': {type: Number},
  'color': {type: String},
  'make': {type: String, required: true},
  'category': {type: String, required: true},
  'rider': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'rider'},
}, {timestamps: true});

Bike.pre('save', function(next) {
  Rider.findById(this.rider)
    .then(rider => {
      let bikeIds = new Set(rider.bikes);
      bikeIds.add(this._id);
      rider.bikes = [...bikeIds];
      rider.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Bike.')));
});

module.exports = mongoose.model('bikes', Bike);