'use strict'

const Farm = require('./farm')
const mongoose = require('mongoose')
const debug = require('debug')('http:model-animal')

const Animal = mongoose.Schema({
    'name': { type: String, required: true },
    'legs': { type: Number},
    'class': { type: String},
    "zoo": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'zoo'}
})

Animal.pre('save', function(next) {
    Farm.findById(this.farm)
    .then(farm => {
      farm.animals = [...new Set(farm.animals).add(this._id)]
      album.save()
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Animal.')))
  })








module.exports = mongoose.model('animals', Animal)