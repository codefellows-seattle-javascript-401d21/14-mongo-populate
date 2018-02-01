'use strict';

const Farm = require('../model/farm')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
    router.route('/farm/:_id?')
    .get((req, res) => {
        if(req.params._id) {
            return Farm.findbyId(req.params._id)
            .then(farm => res.status(200),json(farm))
            .catch(err => errorHandler(err, res))
        }
        Farm.find()
        .then(farms => farms.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err,res))
    })
    .post(bodyParser, (req, res) => {
        new Farm(req.body).save()
        .then(farm => res.status(201).json(farm))
        .catch(err => errorHandler(err, res))
    })
      // .put()
  // .delete()
}