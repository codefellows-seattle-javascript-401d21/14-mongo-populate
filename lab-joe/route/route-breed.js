'use strict';

const Breed = require('../model/breed');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-breed');

module.exports = function (router) {
    router.route('/breed/:_id?')
        // GET
        .get((req, res) => {
            debug(`#get: _id: ${req.params._id}`);
            if (req.params._id) {
                return Breed.findById(req.params._id)
                    .then(breed => res.status(200).json(breed))
                    .catch(err => errorHandler(err, res));
            }

            Breed.find()
                .then(breeds => breeds.map(breed => ({ _id: breed._id, name: breed.name })))
                .then(ids => res.status(200).json(ids))
                .catch(err => errorHandler(err, res));
        })
        // POST
        .post(bodyParser, (req, res) => {
            debug(`#post: req.body.name: ${req.body.name}`);
            new Breed(req.body).save()
                .then(breed => res.status(201).json(breed))
                .catch(err => errorHandler(err, res));
        })
        // PUT
        .put(bodyParser, (req, res) => {
            debug(`#put: req.params._id: ${req.params._id}`);

            if (!req.params._id)
                return errorHandler(new Error('Validation Error: Id required'), res);

            return Breed.findByIdAndUpdate(req.params._id, req.body)
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        })
        // DELETE
        .delete((req, res) => {
            debug(`#delete: req.params._id: ${req.params._id}`);

            if (!req.params._id)
                return errorHandler(new Error('Validation Error: Id required'), res);

            return Breed.findByIdAndRemove(req.params._id)
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        });
};