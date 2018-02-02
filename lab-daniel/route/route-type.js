'use strict';

const Type = require('../model/type');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/startype/:_id?')
    .get((req, res) => {
      if (req.params._id) {
        return Type.findById(req.params._id)
          .then(type => res.status(200).json(type))
          .catch(err => errorHandler(err, res));
      }

      Type.find()
        .then(records => records.map(v => ({ _id: v._id, name: v.name })))
        .then(types => res.status(200).json(types))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      new Type(req.body).save()
        .then(type => res.status(201).json(type))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to update'), res);
      Type.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Type.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });

};