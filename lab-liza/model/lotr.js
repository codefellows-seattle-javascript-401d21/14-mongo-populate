'use strict';

const Species = require('./species');
const mongoose = require('mongoose');

const Lotr = mongoose.Schema({
  'name': { type: String },
  'species': { type: String },
}, {timestamps: true});


Lotr.pre('save', function(next) {
  Species.findById(this.species)
    .then(species => {
      species.tracks = [...new Set(species.tracks).add(this._id)];

      // let trackIds = new Set(album.tracks)
      // trackIds.add(this._id)
      // album.tracks = [...trackIds]

      species.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Track.')));
});

Lotr.post('remove', function(doc, next) {
  Species.findById(doc.LotrType)
    .then(type => {
      type.lotrs = type.lotrs.filter(a => a.toString() !== doc._id.toString());
      type.save();
    })
    .then(next)
    .catch(next);
});
module.exports = mongoose.model('lotr', LOTR);
