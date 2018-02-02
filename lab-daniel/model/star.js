'use strict';

const mongoose = require('mongoose');
const Type = require('./type');

const Star = mongoose.Schema({
  starName: {type: String, required: true},
  id: {type: Number},
  mass: {type: Number},
  diameter: {type: Number},
  galX: {type: Number},
  galY: {type: Number},
  galZ: {type: Number},
  dist: {type: Number},
  starType: {type: String, required: true},
  temp: {type: Number},
  color: {type: Number},

});

Star.pre('save', function(next) {
  Type.findById(this.starType)
    .then(type => {
      type.stars = [...new Set(type.stars).add(this._id)];
      Type.findByIdAndUpdate(this.starType, { stars: type.stars });
    })
    .then(next)
    .catch(() => next(new Error('Validation Error: Failed to save new star record')));
});

Star.post('remove', function(doc, next) {
  Type.findById(doc.starType)
    .then(type => {
      type.stars = type.stars.filter(a => a.toString() !== doc._id.toString());
      Type.findByIdAndUpdate(this.starType, { stars: type.stars });
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('stars', Star);