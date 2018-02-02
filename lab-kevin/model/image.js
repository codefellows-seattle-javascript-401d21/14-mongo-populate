'use strict';
const mongoose = require('mongoose');
const Album = require('./album');
const debug = require('debug')('http:note-constructor');

const Image = mongoose.Schema({
  file_name: {type: String},
  file_path : {type: String},
  photographer: {type: String},
  title: {type: String},
  description : {type: String},
  album: {type: mongoose.Schema.Types.ObjectId , required: true, ref: 'album' },

}, {timestamps: true}
);

Image.pre('save', function(next){
  this.file_name = this.file_path.split('/').pop();
  Album.findById(this.album)
    .then(album => {
      album.images.push(this._id);
      album.save();
      return;
    })
    .then(next)
    .catch(() => next(new Error('validationError: failed to update image')));
});

Image.post('remove', function(next){
  Album.findById(this.album)
    .then(album => {
      album.images = album.images.filter(img => img !== this._id);
      album.save();
      return;
    })
    .then(next)
    .catch(() => next(new Error('validationError: failed to remove image')));
});


module.exports = mongoose.model('image', Image);

