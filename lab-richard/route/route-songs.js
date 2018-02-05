'use strict';

const Song = require('../model/song');
const bodyParser = require('body-parser').json();
const debug = require('debug')('http:route-Song');
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {

    router.route('/song/:_id?')
        .get((req, res) => {
            debug(`${req.method}: ${req.url}`);

            if(req.params._id) {
                return Song.findById(req.params._id)
                    .then(song => song ? res.status(200).json(song) : errorHandler(new Error('ENOENT'), res))
                    .catch(err => errorHandler(err, res));
            }  

            return Song.find()
                .then(songsArr => songsArr.map(bandsArr => bandsArr._id))
                .then(bandIDs => res.status(200).json(bandIDs))
                .catch(err => errorHandler(err, res));
        })
        
        .post(bodyParser, (req, res) => {
            new Song(req.body).save()
                .then(song => res.status(201).json(song))
                .catch(err => errorHandler(err, res));
        })

        .put(bodyParser, (req, res) => {
            return Song.findByIdAndUpdate(req.params._id, req.body, {runValidators: true})
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        })

        .delete((req, res) => {
            if (!req.params._id) errorHandler(new Error('Validation Error'), res);
            Song.findById(req.params._id)
                .then(song => song.remove())
                .then(() => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        });

};