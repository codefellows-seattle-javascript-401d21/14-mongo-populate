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

Note.post('remove', function(doc, next) {
    Author.findById(doc.authorType)
        .then(author => {
            author.notes = author.notes.filter(e => e.toString() !== doc._id.toString());
            author.save();
        })
        .then(next)
        .catch(next);
});

module.exports = mongoose.model('nots', Note);
