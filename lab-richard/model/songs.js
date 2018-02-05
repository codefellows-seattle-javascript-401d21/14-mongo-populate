'use strict';

const Band = require('./band');
const mongoose = require('mongoose');
const debug = require('debug')('http:model-song');

const Song = mongoose.Schema({
    "title": {type: String, required: true},
    "lyric": {type: String, required: true},
    "band": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'band'},
}, { timestamps: true });

 
Song.pre('save', function(next) {
    Band.findById(this.band)
        .then(band => {
            band.songs = [...new Set(band.songs).add(this._id)];

            band.save();
        })
        .then(next)
        .catch(() => next(new Error('Validation Error. Failed to save song.')));
});

Song.post('remove', function(doc, next) {
    Band.findById(doc._id)
        .then(band => {
            band.songs = band.songs.filter(a => doc._id.toString() !== a.toString());
            band.save();
        })
        .then(next)
        .catch(next);
});

module.exports = mongoose.model('song', Song);