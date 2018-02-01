'use strict';

const mongoose = require('mongoose')

const Farm = module.exports = mongoose.Schema({
    name: {type: String, max: 32},
    animals: [{type: mongoose.Schema.Types.ObjectId, ref: 'animal'}]
})

module.exports = mongoose.model('farm', Farm)