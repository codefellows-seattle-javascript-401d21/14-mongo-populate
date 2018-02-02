'use strict'

const mongoose = require('mongoose')
const Species = require('./species.js')
const Tolkien = mongoose.Schema({
  'name': { type: String},
  "species": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'species'}
}, { timestamps: true })


Tolkien.pre('save', function(next) {
  Species.findById(this.species)
    .then(species => {
      species.tolkien = [...new Set(species.tolkien).add(this._id)];

      // let trackIds = new Set(album.tracks)
      // trackIds.add(this._id)
      // album.tracks = [...trackIds]

      species.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save tolkien.')));
});

Tolkien.post('remove', function(doc, next) {
  Species.findById(doc.tolkienType)
    .then(species => {
      species.tolkien = species.tolkien.filter(a => a.toString() !== doc._id.toString());
      species.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('tolkiens', Tolkien)
