'use strict';

const mongoose = require('mongoose');
const Image = require('./image');

const Album = module.exports = new mongoose.Schema({
  title:{type: String, required: true},
  images: [{type: mongoose.Schema.Types.ObjectId, ref: Image} ],
},
{timestamps: true}

);

Album.pre('save', function(next){
  if (!this.images.length) return next(); 
  this.images = [...new Set(this.images)];
  next();
});

mongoose.save('album', Album);