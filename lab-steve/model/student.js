'use strict';

const Major = require('./major');
const mongoose = require('mongoose');
const debug = require('debug')('http:student');

const Student = mongoose.Schema({
  'name': {type: String, require: true},
  'student_id': String,
  'age': Number,
  'campus': String,
  'major': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'major'},
}, {timestamps: true});

// Before saving the student, find the major and add the students id to it
Student.pre('save', function (next) {
  debug(`#Student.pre-save: Attempting to add "${this.name}" to "${this.major}"`);

  Major.findById(this.major)
    .then(major => {
      major.students = [...new Set(major.students).add(this._id)];
      major.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Student.')));
});

Student.post('remove', function(doc, next) {
  debug(`#Student.pre-remove: Attempting to remove "${doc.name}" from "${doc.major}"`);

  Major.findById(doc.major)
    .then(major => {
      major.students = major.students.filter(idOb => idOb.toString() !== doc._id.toString());
      major.save();
    })
    .then(next)
    .catch(next);
});

// Must always be at the bottom due to how mongoose works
module.exports = mongoose.model('students', Student);

