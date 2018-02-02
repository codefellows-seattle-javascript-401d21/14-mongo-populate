'use strict'

const Farm = require('./farm')
const mongoose = require('mongoose')
const debug = require('debug')('http:model-animal')

const Animal = mongoose.Schema({
    'name': { type: String, required: true },
    'legs': { type: Number},
    'class': { type: String},
    "farm": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'farm'}
})

// Animal.pre('save', function(next) {
//   Type.findById(this.farm)
//     .then(farm => {
//       farm.animals = [...new Set(farm.animals).add(this._id)];
//       farm.findByIdAndUpdate(this.farm, { animals: farm.animals });
//     })
//     .then(next)
//     .catch(() => next(new Error('Validation Error: Failed to save new star record')));
// });

// Animal.post('remove', function(doc, next) {
//   farm.findById(doc.starfarm)
//     .then(farm => {
//       farm.animals = farm.animals.filter(a => a.toString() !== doc._id.toString());
//       farm.findByIdAndUpdate(this.farm, { animals: farm.animals });
//     })
//     .then(next)
//     .catch(next);
// });
Animal.pre('save', function(next) {
    Farm.findById(this.farm)
    .then(farm => {
      farm.animals = [...new Set(farm.animals).add(this._id)]
      farm.save(next)
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Animal.')))
  })

  Animal.post('remove', function(doc, next) {
    Farm.findById(doc.farm)
      .then(animal => {
        animal.farm = animal.farm.filter(a => a.toString() !== doc._id.toString());
        animal.save();
      })
      .then(next)
      .catch(next);
  });

module.exports = mongoose.model('animals', Animal)