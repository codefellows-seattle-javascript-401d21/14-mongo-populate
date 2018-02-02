'use strict'

const mongoose = require('mongoose')

const Make = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  models: [{type: mongoose.Schema.Types.ObjectId, ref: 'model'}],
})

module.exports = mongoose.model('make', Make)