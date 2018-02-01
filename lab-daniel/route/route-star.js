'use strict';

const Star = require('../model/star');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/star/:_id?')
    .get((req, res) => {
      if (req.params._id) {
        return Star.findById(req.params._id)
          .then(star => res.status(200).json(star))
          .catch(err => errorHandler(err, res));
      }

      Star.find()
        .then(records => records.map(v => ({_id: v._id, starName : v.starName})))
        .then(stars => res.status(200).json(stars))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      new Star(req.body).save()
        .then(star => res.status(201).json(star))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to update'), res);
      Star.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Star.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });

};