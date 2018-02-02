'use strict'

const Model = require('../model/model')
const bodyParser = require('body-parser').json()
const debug = require('debug')('http:route-model')
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  router.route('/model/:_id?')
    .get((req, res) => {
      debug(`${req.method}: ${req.url}`)

      if(req.params._id) {
        return Model.findById(req.params._id)
        // .populate('make')
          .then(model => res.status(200).json(model))
          .catch(err => errorHandler(err, res))
      }

      Model.find()
        .then(models => models.map(t => t._id))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res))
    })
    .post(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`)

      new Model(req.body).save()
        .then(model => res.status(201).json(model))
        .catch(err => errorHandler(err, res))
    })
    .put(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`)

      Model.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res))
    })
    .delete((req, res) => {
      debug(`${req.method}: ${req.url}`)

      Model.findById(req.params._id)
        .then(model => model.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res))
    })
}