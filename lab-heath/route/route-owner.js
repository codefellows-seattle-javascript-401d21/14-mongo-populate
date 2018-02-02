'use strict';

const Owner = require('../model/owner');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/owner/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        return Owner.findById(req.params._id)
          .then(Owner => res.status(200).json(Owner))
          .catch(err => errorHandler(err, res));
      }

      Owner.find()
        .then(Owners => Owners.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      new Owner(req.body).save()
        .then(owner => res.status(201).json(owner))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      Owner.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res)); 
    })

    .delete((req, res) => {
      Owner.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res)); 
    });
};