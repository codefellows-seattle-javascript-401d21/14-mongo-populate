'use strict';

const Species = require('../model/species')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  router.route('/species/:_id?')
  .get((req, res) => {
    if(req.params._id) {
      return Species.findById(req.params._id)
      .then(species => res.status(200).json(species))
      .catch(err => errorHandler(err, res))
    }

    Species.find()
    .then(species => species.map(a => ({_id: a._id, name: a.name})))
    .then(ids => res.status(200).json(ids))
    .catch(err => errorHandler(err, res))
  })
  .post(bodyParser, (req, res) => {
    new Species(req.body).save()
    .then(species => res.status(201).json(species))
    .catch(err => errorHandler(err, res))
  })
  .put(bodyParser, (req, res) => {
    Species.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true })
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res))
  })
  .delete((req, res) => {
    // FIXME
  })
}
