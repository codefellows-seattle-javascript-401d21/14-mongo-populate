'use strict';

const country = require('../model/country');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/country/:_id?')
    .get((req, res) => {

      if(req.params._id) {
        return country.findById(req.params._id)
          .then(country => res.status(200).json(country))
          .catch(err => errorHandler(err, res));
      }

      return country.find()
        .then(country => res.status(200).json(country))
        .catch(err => errorHandler(err, res));

    })
    .post(bodyParser, (req, res) => {
      new country(req.body).save()
        .then(country => res.status(201).json(country))
        .catch(err => errorHandler(err, res));

    })
    .put(bodyParser, (req, res) => {
      return country.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(202))
        .catch(err => errorHandler(err, res));


    })
    .delete((req, res) => {
      return country.findByIdAndRemove(req.params._id)
        .then(() => res.status(204).end())
        .catch(err => errorHandler(err, res));
    });



};
