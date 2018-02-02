'use strict'

const Tolkien = require('../model/tolkien')
const bodyParser = require('body-parser').json()
const debug = require('debug')('http:route-tolkien')
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  router.route('/tolkien/:_id?')
  .get((req, res) => {
    debug(`${req.method}: ${req.url}`)

    if (req.params._id) {
      return Tolkien.findById(req.params._id)
        .populate('species')
        .then(tolkien => res.status(200).json(tolkien))
        .catch(err => errorHandler(err, res))
    }

    Tolkien.find()
      .then(tracks => tracks.map(t => t._id))
      .then(ids => res.status(200).json(ids))
      .catch(err => errorHandler(err, res))
  })
  .post(bodyParser, (req, res) => {
    debug(`${req.method}: ${req.url}`)

    new Tolkien(req.body).save()
    .then(tolkien => res.status(201).json(tolkien))
    .catch(err => errorHandler(err, res))
  })
  .put(bodyParser, (req, res) => {
    debug(`${req.method}: ${req.url}`)

    Tolkien.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true })
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res))
  })
  .delete((req, res) => {
    if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
    Tolkien.findById(req.params._id)
      .then(tolkien => tolkien.remove())
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, res));
  });
}
