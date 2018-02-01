'use strict';

const Student = require('../model/student');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-student');

module.exports = (router) => {
  router.route('/student/:_id?')
    .get((req, res) => {
      debug(`#get: _id: ${req.params._id}`);

      if (req.params._id) {
        return Student.findById(req.params._id)
          .then(s => res.status(200).json(s))
          .catch(err => errorHandler(err, res));
      }

      return Student.find({})
        .then(studentObjs => studentObjs.map(e => e._id))
        .then(students => res.status(200).json(students))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      debug(`#post: req.body.full_name: ${req.body.full_name}`);

      new Student(req.body).save()
        .then(s => res.status(201).json(s))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      debug(`#put: req.params._id: ${req.params._id}`);

      return Student.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
    .delete((req, res) => {
      debug(`#delete: req.params._id: ${req.params._id}`);

      return Student.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
