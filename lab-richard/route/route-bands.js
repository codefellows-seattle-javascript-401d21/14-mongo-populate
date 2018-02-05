'use strict';

const Band = require('../model/band');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
    router.route('/band/:_id?')
        .get((req,res) => {
            if(req.params._id) {
                return Band.findById(req.params._id)
                    .then(band => res.status(200).json(band))
                    .catch(err => errorHandler(err, res));
            }
            
            Band.find()
                .then(bands => bands.map(a => ({_id: a._id, name: a.name})))
                .then(ids => res.status(200).json(ids))
                .catch(err => errorHandler(err, res));
        })

        .post(bodyParser, (req, res) => {
            new Band(req.body).save()
                .then(band => res.status(201).json(band))
                .catch(err => errorHandler(err, res));
        })

        .put(bodyParser, (req, res) => {
            return Band.findByIdAndUpdate(req.params._rd, req.body, {runValidators: true})
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        })

        .delete((req, res) => {
            return Band.findByIdAndRemove(req.params._id)
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        });
};