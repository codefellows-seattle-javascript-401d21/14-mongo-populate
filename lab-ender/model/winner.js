'use strict';

const Year = require('./year');
const mongoose = require('mongoose');
const debug = require('debug')('http:model-champ');

const Winner = mongoose.Schema({
  'name': { type: String, required: true },
  'type': { type: String, required: true },
  'main_lane': { type: String, required: true },
  'winrate_percent': { type: Number, required: true },
  'year': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'year'},
},  {timestamps: true});

module.exports = mongoose.model('winners', Winner);

Winner.pre('save', function(next) {
  Year.findById(this.year)
    .then(year => {
      year.winners = [...new Set(year.winners).add(this._id)];
      year.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save winner.')));
});

Winner.post('remove', function(doc, next) {
  Year.findById(doc._id)
    .then(year => {
      year.stars = year.stars.filter(a => a.toString() !== doc._id.toString());
      year.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('winner', Winner);
