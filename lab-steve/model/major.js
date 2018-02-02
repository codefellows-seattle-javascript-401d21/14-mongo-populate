'use strict';

const mongoose = require('mongoose');
// const Student = require('./student');
// const debug = require('debug')('http:major');

const Major = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'student'}],
});

// I couldn't get this to work, but I'm fairly certain it should be done
// Major.pre('remove', function (next) {
//   debug(`#Major.pre-remove: Attempting to remove all child documents"`);
//
//   if (!this.students.length) {
//     next();
//     return;
//   }
//
//   Student.remove(this.students)
//     .then(next)
//     .catch(() => next(new Error('Validation Error: Failed to remove students')));
// });

module.exports = mongoose.model('major', Major);

