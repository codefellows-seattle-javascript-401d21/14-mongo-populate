'use strict'

const Make = require('../model/make')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler')
const debug = require('debug')('http:Router')

module.exports = function(router) {
  
  router.route('/make/:_id?')

    .get((req, res) => {
      debug(`${req.method}: ${req.url}`)

      if(req.params._id) {
        Make.findById(req.params._id)
          .then(make => res.status(200).json(make))
          .catch(err => errorHandler(err, res))
      }
      Make.find()
        .limit(10)
        .then(make => res.status(200).json(make))
        .catch(err => errorHandler(err, res))
    })

    .post(bodyParser, (req, res) => {
      new Make(req.body).save()
        .then(make => res.status(201).json(make)) 
        .catch(err => errorHandler(err, res))
    })

  router.route('/make/:_id?')
    .put(bodyParser, (req, res) => {
      Make.findByIdAndUpdate(req.params._id, req.body)
        .then(make => res.status(204).json(make)) 
        .catch(err => errorHandler(err, res))
    })

  router.route('/make/:_id?')
    .delete((req, res) => {
      Make.findByIdAndRemove(req.params._id)
        .then(make => res.status(204).json(make)) 
        .catch(err => errorHandler(err, res))
    })
}