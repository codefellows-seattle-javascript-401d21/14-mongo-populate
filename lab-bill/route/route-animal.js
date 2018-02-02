'use strict';

const Animal = require('../model/animal');
const bodyParser = require('body-parser').json();
// const debug = require('debug')('http:route-animal');
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/animal/:_id?')
    .get((req, res) => {

      if(req.params._id) {
        return Animal.findById(req.params._id)
          .then(animal => {
            console.log('animal!!!!!',animal);
            res.status(200).json(animal
            );})
          .catch(err => errorHandler(err,res));
      }
      return Animal.find()
        .then(animals => animals.map(a => a._id))
        .then(animal => res.status(200).json(animal))
        .catch(err => errorHandler(err,res));
    })
    .post(bodyParser, (req, res) => {
      // if(!req.body) throw new Error('Validation Error. Cannot create animal. response body required')
      new Animal(req.body).save()
        .then(animal => res.status(201).json(animal))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      return Animal.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));

    })
    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Animal.findById(req.params._id)
        .then(animal => animal.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};