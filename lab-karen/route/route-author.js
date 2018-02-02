'use strict';

const Author = require('../model/author');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-author');



module.exports = function(router) {
  debug('route-author');
  router.route('/author/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        return Author.findById(req.params._id)
          .then(author => res.status(200).json(author))
          .catch(err => errorHandler(err, res));
      }

      Author.find()
        .then(authors => authors.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      new Author(req.body).save()
        .then(author => res.status(201).json(author))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) =>{
      debug(`${req.method}: ${req.url}`);
      Author.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete(bodyParser, (req, res) =>{
      debug(`${req.method}: ${req.url}`);
      Author.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
