'use strict';

const Lotr = require('../model/lotr');
const bodyParser = require('body-parser').json();
const debug = require('debug')('http:route-lotr');
const errorHandler = require('../lib/error-handler');


module.exports = function(router) {
  router.route('/lotr/:_id?')
    .get((req, res) => {
      debug(`${req.method}: ${req.url}`);

      if(req.params._id) {
        return Lotr.findById(req.params._id)
        // .populate('species')
          .then(lotr => res.status(200).json(lotr))
          .catch(err => errorHandler(err, res));
      }

      Lotr.find()
        .then(lotrs => lotrs.map(t => t._id))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);

      new Lotr(req.body).save()
        .then(lotr => res.status(201).json(lotr))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);

      Lotr.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
    .delete((req, res) => {
      debug(`${req.method}: ${req.url}`);

      Lotr.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};