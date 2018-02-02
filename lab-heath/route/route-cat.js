'use strict';

const Cat = require('../model/cat');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {

  router.route('/cat/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        Cat.findById(req.params._id)
          .then(cat => res.status(200).json(cat))
          .catch(err => errorHandler(err, res));
      }
      Cat.find()
        .then(cat => cat.map(cat => cat._id))
        .then(cat => res.status(200).json(cat))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      new Cat(req.body).save()
        .then(cat => res.status(201).json(cat))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      Cat.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res)); 
    })

    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Cat.findById(req.params._id)
        .then(owner => owner.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });

};