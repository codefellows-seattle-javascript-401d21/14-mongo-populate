'use strict'

const mongoose = require('mongoose')

const Tolkien = mongoose.Schema({
  'name': { type: String},
  "species": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'species'}
}, { timestamps: true })


Tolkien.pre('save', function(next) {
  Species.findById(this.species)
  .then(species => {
    species.tolkiens = [...new Set(species.tolkiens).add(this._id)]

    // let tolkienIds = new Set(species.tolkiens)
    // tolkienIds.add(this._id)
    // species.tolkiens = [...tolkienIds]

    species.save()
  })
  .then(next)
  .catch(() => next(new Error('Validation Error. Failed to save Tolkien.')))
})

Tolkien.post('remove', function(doc, next) {
  Species.findById(doc.species)
    .then(type => {
      species.tolkiens = species.tolkiens.filter(a => a.toString() !== doc._id.toString());
      species.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('tolkien', Tolkien)
