'use strict';

const mongoose = require('mongoose');
const Author = require('./author');
const debug = require('debug')('http:model-note');

const Note = mongoose.Schema({
    'title': { type: String, require: true },
    'content': { type: String, require: true },
    'important': { type: Boolean },
    'author': { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'author' },
}, { timestamps: true });

Note.pre('save', function(next) {
    Author.findById(this.author)
        .then(author => {
            author.notes = [...new Set(author.notes).add(this._id)];
            author.save();
        })
        .then(next)
        .catch(() => next(new Error('Validation Error. Failed to save note.')));
});

module.exports = mongoose.model('nots', Note);

// TODO: Need to Debug.
// Track.post('remove', function(doc, next) {
//   Album.findById(doc.album)
//   .then(album => {
//     console.log(album.tracks)
//     album.tracks = album.tracks.filter(a => doc._id !== a)
//     album.save()
//     // might need to return the above line?? Not sure. Test it!
//   })
//   .then(next)
//   .catch(next)
// })
