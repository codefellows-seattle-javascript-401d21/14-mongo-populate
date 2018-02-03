'use strict';

const Book = require('../model/book');
const bodyParser = require('body-parser').json();
const debug = require('debug');
const errorHandler = require('../lib/error-handler');

module.exports = (router) => {
  router.route('/book/:_id?')
    .get(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url} `);
      if(req.params._id) {
        return Book.findById(req.params._id)
          .then(books => res.status(200).json(books))
          .catch(err => errorHandler(err, res));
      } 
      Book.find(req.params.Schema)
        .then(books => res.status(200).json(books))
        .catch(err => errorHandler(err, res));
    
    })

    .post(bodyParser, (req, res) => {
      new Book(req.body).save()
        .then(books => res.status(201).json(books))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser,(req,res) => {
      debug(`${req.method}: ${req.url} `);
      Book.findByIdAndUpdate(req.params._id, req.body) 
        .then((books) => res.sendStatus(204).json(books))
        .catch(err => errorHandler(err, res));
    })

    .delete((req,res) => {
      debug(`${req.method}: ${req.url} `);
      Book.findById(req.params._id)
        .then(track => track.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};