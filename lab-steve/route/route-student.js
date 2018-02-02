'use strict';

const Student = require('../model/student');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-student');

module.exports = (router) => {
  router.route('/student/:_id?')
  // GET
    .get((req, res) => {
      debug(`#get: _id: ${req.params._id}`);

      if (req.params._id) {
        return Student.findById(req.params._id)
          .then(s => res.status(200).json(s))
          .catch(err => errorHandler(err, res));
      }

      Student.find({})
        .then(studentObjs => studentObjs.map(e => e._id))
        .then(students => res.status(200).json(students))
        .catch(err => errorHandler(err, res));
    })
  // POST
    .post(bodyParser, (req, res) => {
      debug(`#post: req.body.name: ${req.body.name}`);

      new Student(req.body).save()
        .then(s => res.status(201).json(s))
        .catch(err => errorHandler(err, res));
    })
  // PUT
    .put(bodyParser, (req, res) => {
      debug(`#put: req.params._id: ${req.params._id}`);

      return Student.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
  // DELETE
    .delete((req, res) => {
      debug(`#delete: req.params._id: ${req.params._id}`);

      // Must find and explicitly call .remove() to trigger post delete
      Student.findById(req.params._id)
        .then(student => student.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
