'use strict';

const mongoose = require('mongoose');
const Band = mongoose.Schema({
    'name': { type: String, required: true },
    'songs': [{type: mongoose.Schema.Types.ObjectId, ref: 'song'}],
});

module.exports = mongoose.model('bands', Band);