'use strict'

const Make = require('./make')
const mongoose = require('mongoose')
const debug = require('debug')('http:model-model')

const Model = mongoose.Schema({
  'name': {type: String, required: true},
  'year': {type: Number},
  'make': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'make'},
}, { timestamps: true })


Model.pre('save', function(next) {
  Make.findById(this.make)
    .then(make => {
      make.models = [...new Set(make.models).add(this._id)]

      make.save()
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Model.')))
})

Model.post('remove', function(doc, next) {
  Make.findById(doc.make)
    .then(make => {
      make.models = make.models.filter(a => doc._id.toString() !== a.toString())
      make.save()
    })
    .then(next)
    .catch(next)
})
module.exports = mongoose.model('model', Model)
