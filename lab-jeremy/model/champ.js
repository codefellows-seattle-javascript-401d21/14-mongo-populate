'use strict';

const Season = require('./season');
const mongoose = require('mongoose');
const debug = require('debug')('http:model-champ');

const Champ = mongoose.Schema({
  'name': { type: String, required: true },
  'type': { type: String, required: true },
  'main_lane': { type: String, required: true },
  'winrate_percent': { type: Number, required: true },
  'season': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'season'},
},  {timestamps: true});

module.exports = mongoose.model('champs', Champ);

Champ.pre('save', function(next) {
  Season.findById(this.season)
    .then(season => {
      season.champs = [...new Set(season.champs).add(this._id)];

      // let champIds = new Set(season.champs)
      // champIds.add(this._id)
      // season.champs = [...champIds]

      season.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Champ.')));
});

Champ.post('remove', function(doc, next) {
  Season.findById(doc._id)
    .then(season => {
      season.stars = season.stars.filter(a => a.toString() !== doc._id.toString());
      season.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('champ', Champ);