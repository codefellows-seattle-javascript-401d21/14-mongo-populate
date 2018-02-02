'use strict';

const Season = require('../model/season');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/season/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        return Season.findById(req.params._id)
          .then(season => res.status(200).json(season))
          .catch(err => errorHandler(err, res));
      }

      Season.find()
        .then(seasons => seasons.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Season(req.body).save()
        .then(season => res.status(201).json(season))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      return Season.findByIdAndUpdate(req.params._id, req.body, {runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete((req, res) => {
      return Season.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
  
};
