'use strict';

const mongoose = require('mongoose');
const country = require('./country');

const City = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  country: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'country'}],
});



City.pre('save', function(next) {
  console.log('this.country', this)
  country.findById(this.country)
    .then(country => {
      country.city = [...new Set(country.city).add(this._id)];

      // let trackIds = new Set(album.tracks)
      // trackIds.add(this._id)
      // album.tracks = [...trackIds]
      console.log('country in city save ', country);
      country.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save city.')));
});

City.post('remove', function(doc, next) {
  country.findById(doc.country)
    .then(country => {
      country.city = country.city.filter(a => a.toString() !== doc._id.toString());
      country.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('city', City);