'use strict';

const Farm = require('../model/farm');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/farm/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        return Farm.findbyId(req.params._id)
          .then(farm => res.status(200).json(farm))
          .catch(err => errorHandler(err, res));
      }
      Farm.find()
        .then(farms => farms.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err,res));
    })
    .post(bodyParser, (req, res) => {
      new Farm(req.body).save()
        .then(farm => res.status(201).json(farm))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      return Farm.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Farm.findById(req.params._id)
        .then(farm => farm.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};