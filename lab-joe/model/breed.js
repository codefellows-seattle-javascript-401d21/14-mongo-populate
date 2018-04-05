'use strict';

const mongoose = require('mongoose');

const Breed = module.exports = mongoose.Schema({
    name: { type: String, max: 32 },
    dogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dog' }],
});

module.exports = mongoose.model('breed', Breed);