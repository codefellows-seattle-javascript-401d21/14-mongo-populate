'use strict';

const Owner = require('./owner');
const mongoose = require('mongoose');

const Cat = mongoose.Schema({
  'age': { type: Number },
  'color' : { type: String, required: true },
  'name': { type: String, required: true },
  'owner': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'owner'},
}, {timestamps: true});


Cat.pre('save', function(next) {
  Owner.findById(this.owner)
    .then(owner => {
      let catIds = new Set(owner.cats);
      catIds.add(this._id);
      owner.cats = [...catIds];
      Owner.findByIdAndUpdate(this.owner, {owner: owner.cats});
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Cat.')));
});

Cat.post('remove', function(doc, next) {
  Owner.findById(doc.rider)
    .then(owner => {
      owner.cats = owner.cats.filter(a => a.toString() !== doc._id.toString());
      Owner.findByIdAndUpdate(this.owner, {owner: owner.cats});
    })
    .then(next)
    .catch(next);
});


module.exports = mongoose.model('cats', Cat);

