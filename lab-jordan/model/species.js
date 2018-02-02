'use strict'

const mongoose = require('mongoose')

const Species = module.exports = mongoose.Schema({
  name: {type: String},
  tolkiens: [{type: mongoose.Schema.Types.ObjectId, ref: 'tolkien'}]
})

module.exports = mongoose.model('species', Species)
