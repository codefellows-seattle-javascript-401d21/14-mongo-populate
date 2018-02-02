'use strict';

const mongoose = require('mongoose');

const Student = mongoose.Schema({
  'full_name': {type: String, require: true},
  'student_id': String,
  'age': Number,
  'campus': String,
  'major': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'major'},
}, {timestamps: true});

// Before saving the student, find the major and add the students id to it
Student.pre('save', function (next) {
  Major.findById(this.major)
    .then(major => {
      major.students = [...new Set(major.students).add(this._id)];
      major.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Student.')));
});

// Before removing the student, find the major and remove the students id from it
Student.pre('remove', function (student, next) {
  Major.findById(student.major)
    .then(major => {
      major.students = major.students.filter(s => s._id.toString() !== student._id.toString());
      major.save();
    })
    .then(next)
    .catch(next);
});

// Must always be at the bottom due to how mongoose works
module.exports = mongoose.model('students', Student);

