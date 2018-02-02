'use strict';

const Book = require('../model/book');
const bP = require('body-parser').json();
const eH = require('../lib/error-handler');
const debug = require('debug')('http:route-book');


module.exports = function(router) {

  debug('Inside of function(router) in route-book.js');

  router.route('/book/:_id?')

    .get((req, res) => {

      debug(`Inside of get method. method and url: ${req.method}: ${req.url}`);

      // get a specific data
      if(req.params._id) {

        debug(`Inside of get one. id: ${req.params._id}`);

        return Book.findById(req.params._id)
          .then(book => res.status(200).json(book))
          .catch(err => eH(err, res));
      }

      debug(`Inside of get all.`);
      // get all data
      return Book.find()
        .then(books => {
          if(books === null) throw new Error('enoent');
          if(books) res.status(200).json(books);})
        .catch(err => eH(err, res));

    })

    .post(bP, (req, res) => {

      debug(`Inside of post method. method and url: ${req.method}: ${req.url}`);

      new Book(req.body).save()
        .then(book => res.status(201).json(book))
        .catch(err => eH(err, res));
    })

    .put(bP, (req, res) => {

      debug(`Inside of put method. method and url: ${req.method}: ${req.url}`);

      return Book.findByIdAndUpdate(req.params._id, req.body)
        .then(book => res.status(204).json(book))
        .catch(err => eH(err, res));
    })

    .delete((req, res) => {

      debug(`Inside of delete method. method and url: ${req.method}: ${req.url}`);

      // delete a specific data
      if(req.params._id) {

        debug(`Delete one data. id: ${req.params._id}`);

        return Book.findById(req.params._id)
          .then(book => book.remove())
          .then(() => res.status(204).end())
          .catch(err => eH(err, res));
      }

      debug('delete all');

      // delete all data
      return Book.remove({})
        .then(() => res.status(200).end())
        .catch(err => eH(err, res));

    });
};
