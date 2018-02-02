'use strict';

const mongoose = require('mongoose');
const Image = require('./image');

const Album = mongoose.Schema({
  title:{type: String, required: true},
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'image'} ],
},
{timestamps: true}

);

Album.pre('save', function(next){
  if (!this.images.length) return next(); 
  this.images = [...new Set(this.images)];
  next();
});

Album.post('remove', function(next){
  this.images.forEach(imgId => Image.findByIdAndRemove(imgId));
  next();
  // .then(img => {
  //   img.save();
  //   return;
  // })
  //.then(next)
  //.catch(() => next(new Error('validationError: failed to remove image')));
});

module.exports = mongoose.model('album', Album);