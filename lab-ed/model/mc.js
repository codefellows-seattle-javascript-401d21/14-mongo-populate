'use strict'

const mongoose = require('mongoose')

const Mc = mongoose.Schema({
  'make' : { type: String, require: true },
  'model': { type: String, require: true },
}, {timestamps: true})

module.exports = mongoose.model('mc', Mc)