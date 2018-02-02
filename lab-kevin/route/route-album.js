'use strict';

'use strict';

const bodyParser = require('body-parser').json();
const Album = require('../model/album');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:rooute-ablum');

module.exports = function(router){

  router.route('/album/:id?')
    .get((req, res) => {
      debug(req.method, req.params.id);
      if(req.params.id){
        Album.findById(req.params.id)
          .populate('images')
          .then(album => {
            if(!album) throw new Error('ENOENT : File not found');
            res.status(200).json(album);
          })
          .catch(err => errorHandler(err,res));
        return;
      }
      Album.find()
        .then(albums => albums.map(album => album._id))
        .then(albumArr => res.status(200).json(albumArr))
        .catch(err => errorHandler(err,res));
    })
    .post(bodyParser, (req, res) => {
      Album(req.body).save()
        .then(img => res.status(201).send(img))
        .catch(err => errorHandler(err,res));
    })
    .put(bodyParser, (req, res) => {
      Album.findByIdAndUpdate(req.params.id, req.body, {upsert: true, runValidators: true, new: true})
        .then(album => {
          debug('put album', album);
          res.sendStatus(204);
        })
        .catch(err => errorHandler(err,res));
    })
    .delete((req, res) => {
      Album.findByIdAndRemove(req.params.id)
        .then(album => {
          if(!album) throw new Error('ENOENT : File not found');
          res.sendStatus(204);
        })
        .catch(err => errorHandler(err, res));
    });
  
};