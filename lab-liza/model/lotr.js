'use strict';

const Species = require('./species');
const mongoose = require('mongoose');

const Lotr = mongoose.Schema({
  'name': { type: String },
  'species': { type: String },
}, {timestamps: true});
//lotr is track
//species is album

// Lotr.pre('save', function(next) {
//   Species.findById(this.lotrSpecies)
//     .then(species => {
//       species.lotr = [...new Set(species.lotr).add(this._id)];
//       Species.findByIdAndUpdate(this.lotrSpecies, { lotr: species.lotr });
//     })
//     .then(next)
//     .catch(() => next(new Error('Validation Error: Failed to save new lotr record')));
// });

// Lotr.post('remove', function(doc, next) {
//   Species.findById(doc.lotrSpecies)
//     .then(species => {
//       species.lotr = species.lotr.filter(a => a.toString() !== doc._id.toString());
//       Species.findByIdAndUpdate(this.lotrSpecies, { lotr: species.lotr });
//     })
//     .then(next)
//     .catch(next);
// });

Lotr.pre('save', function(next) {
  Species.findById(this.species)
    .then(species => {
      species.lotr = [...new Set(species.lotr).add(this._id)];
      Species.findByIdAndUpdate(this.lotrSpecies, { lotr: species.lotr });
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save lotr.')));
});

Lotr.post('remove', function(doc, next) {
  Species.findById(doc.species)
    .then(species => {
      species.lotr = species.lotr.filter(a => a.toString() !== doc._id.toString());
      Species.findByIdAndUpdate(this.lotrSpecies, { lotr: species.lotr });
    })
    .then(next)
    .catch(next);
});
module.exports = mongoose.model('lotr', Lotr);
