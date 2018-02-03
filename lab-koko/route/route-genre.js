'use strict';

const Genre = require('../model/genre');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');


module.exports = function(router) {
  router.routr('/genre/:_id?')
    .get((req, res) => {
      if (req.params._id) {
        return Genre.findById(req.params._id)
          .then(genre => res.status(200).json(genre))
          .catch(err => errorHandler(err, res));
      }
      Genre.find()
        .then(genres => genres.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Genre(req.body).save()
        .then(genre => res.status(201).json(genre))
        .catch(err => errorHandler(err, res));
    });
  // .put()
  // .delete()

};