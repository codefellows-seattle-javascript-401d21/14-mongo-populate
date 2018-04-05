'use strict';

const Dog = require('../model/dog');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-dog');

module.exports = (router) => {
    router.route('/dog/:_id?')
        // GET
        .get((req, res) => {
            debug(`#get: _id: ${req.params._id}`);

            if (req.params._id) {
                return Dog.findById(req.params._id)
                    .then(s => res.status(200).json(s))
                    .catch(err => errorHandler(err, res));
            }

            Dog.find({})
                .then(dogObjs => dogObjs.map(e => e._id))
                .then(dogs => res.status(200).json(dogs))
                .catch(err => errorHandler(err, res));
        })
        // POST
        .post(bodyParser, (req, res) => {
            debug(`#post: req.body.name: ${req.body.name}`);

            new Dog(req.body).save()
                .then(s => res.status(201).json(s))
                .catch(err => errorHandler(err, res));
        })
        // PUT
        .put(bodyParser, (req, res) => {
            debug(`#put: req.params._id: ${req.params._id}`);

            if (!req.params._id)
                return errorHandler(new Error('Validation Error: Id required'), res);

            return Dog.findByIdAndUpdate(req.params._id, req.body)
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        })
        // DELETE
        .delete((req, res) => {
            debug(`#delete: req.params._id: ${req.params._id}`);

            if (!req.params._id)
                return errorHandler(new Error('Validation Error: Id required'), res);

            // Must find and explicitly call .remove() to trigger post delete
            return Dog.findById(req.params._id)
                .then(dog => dog.remove())
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        });
};