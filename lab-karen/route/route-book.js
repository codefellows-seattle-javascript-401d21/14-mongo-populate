'use strict';

const Book = require('../model/book');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-book');

module.exports = function(router) {

  router.route('/book/:_id?')
    .get((req, res) => {
      debug(`${req.method}: ${req.url}`);

      if(req.params._id) {
        return Book.findById(req.params._id)
          .then(book => res.status(200).json(book))
          .catch(err => errorHandler(err, res));
      }

      Book.find()
        .then(books => books.map(b => b._id))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);

      new Book(req.body).save()
        .then(book => res.status(201).json(book))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) =>{
      debug(`${req.method}: ${req.url}`);
      Book.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete(bodyParser, (req, res) =>{
      debug(`${req.method}: ${req.url}`);
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Book.findById(req.params._id)
        .then(book => book.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
