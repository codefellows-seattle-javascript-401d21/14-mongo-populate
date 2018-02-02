'use strict';

const Major = require('../model/major');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-major');

module.exports = function(router) {
  router.route('/major/:_id?')
  // GET
    .get((req, res) => {
      debug(`#get: _id: ${req.params._id}`);
      if (req.params._id) {
        return Major.findById(req.params._id)
          .then(major => res.status(200).json(major))
          .catch(err => errorHandler(err, res));
      }

      Major.find()
        .then(majors => majors.map(major => ({_id: major._id, name: major.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })
  // POST
    .post(bodyParser, (req, res) => {
      debug(`#post: req.body.full_name: ${req.body.full_name}`);
      new Major(req.body).save()
        .then(major => res.status(201).json(major))
        .catch(err => errorHandler(err, res));
    })
  // PUT
    .put(bodyParser, (req, res) => {
      debug(`#put: req.params._id: ${req.params._id}`);

    })
  // DELETE
    .delete((req, res) => {
      debug(`#delete: req.params._id: ${req.params._id}`);

    });
};
