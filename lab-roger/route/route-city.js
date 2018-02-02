'use strict';

const city = require('../model/city');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/city/:_id?')
    .get((req, res) => {

      if(req.params._id) {
        return city.findById(req.params._id)
          .then(city => res.status(200).json(city))
          .catch(err => errorHandler(err, res));
      }

      return city.find()
        .then(city => res.status(200).json(city))
        .catch(err => errorHandler(err, res));

    })
    .post(bodyParser, (req, res) => {
      new city(req.body).save()
        .then(city => res.status(201).json(city))
        .catch(err => errorHandler(err, res));

    })
    .put(bodyParser, (req, res) => {
      return city.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(202))
        .catch(err => errorHandler(err, res));


    })

    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      city.findById(req.params._id)
        .then(city => city.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
   



};