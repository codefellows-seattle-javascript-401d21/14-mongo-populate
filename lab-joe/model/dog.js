
'use strict';

const Breed = require('./breed');
const mongoose = require('mongoose');
const debug = require('debug')('http:dog');

const Dog = mongoose.Schema({
    'name': { type: String, require: true },
    'dog_id': String,
    'age': Number,
    'breed': { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'breed' },
}, { timestamps: true });


Dog.pre('save', function (next) {
    Breed.findById(this.breed)
        .then(breed => {
            breed.dogs = [...new Set(breed.dogs).add(this._id)];
            breed.save();
        })
        .then(next)
        .catch(() => next(new Error('Validation Error. Failed to save Dog.')));
});

Dog.post('remove', function (doc, next) {
    Breed.findById(doc.breed)
        .then(breed => {
            breed.dogs = breed.dogs.filter(idOb => idOb.toString() !== doc._id.toString());
            breed.save();
        })
        .then(next)
        .catch(next);
});


module.exports = mongoose.model('dogs', Dog);