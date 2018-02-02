'use strict';

const Note = require('../model/note');
const bodyParser = require('body-parser').json();
const debug = require('debug')('http:route-note');
const errorHandler = require('../lib/error-handler');

module.exports = router => {
    router.route('/note/:_id?')
        .get((req, res) => {
            debug(`${req.method}: ${req.url}`);
            if (req.params._id) {
                return Note.findById(req.params._id)
                    // .populate('author')
                    .then(note => res.status(200).json(note))
                    .catch(err => errorHandler(err, res));
            }

            Note.find()
                .then(notes => notes.map(n => n._id))
                .then(ids = res.status(200)).json(ids)
                .catch (err => errorHandler(err, res));
        })

        .post(bodyParser, (req, res) => {
            debug(`${req.method}: ${req.url}`);

            new Note(req.body).save()
                .then(note => res.status(201).json(note))
                .then(err => errorHandler(err, res));
        })

        .put(bodyParser, (req, res) => { //eslint-disable-line
            debug(`${req.method}: ${req.url}`);

            Note.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true })
                .then(res => res.sendStatus(204))
                .catch(err => errorHandler(err, res));
        })

        .delete((req, res) => {
            debug(`${req.method}: ${req.url}`);

            return Note.findByIdAndRemove(req.params._id)
                .then(() => res.status(204))
                .catch(err => errorHandler(err, res));
        });
};