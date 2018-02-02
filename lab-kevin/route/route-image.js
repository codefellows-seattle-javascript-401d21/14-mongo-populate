'use strict';

const bodyParser = require('body-parser').json();
const Image = require('../model/image');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-image');

module.exports = function(router){

  router.route('/image/:id?')
    .get((req, res) => {
      debug(req.method, req.params.id);
      if(req.params.id){
        Image.findById(req.params.id)
          .populate('album')
          .then(img => {
            if(!img) throw new Error('ENOENT : File not found');
            res.status(200).json(img);
          })
          .catch(err => errorHandler(err,res));
        return;
      }

      Image.find()
        .then(imgs => imgs.map(img => img._id))
        .then(imgArr => res.status(200).json(imgArr))
        .catch(err => errorHandler(err,res));

    })
    .post(bodyParser, (req, res) => {
      Image(req.body).save()
        .then(img => res.status(201).send(img))
        .catch(err => errorHandler(err,res));
    })
    .put(bodyParser, (req, res) => {
      Image.findByIdAndUpdate(req.params.id, req.body, {upsert: true, runValidators: true, new: true})
        .then(img => {
          debug('put img', img);
          res.sendStatus(204);
        })
        .catch(err => errorHandler(err,res));
    })
    .delete((req, res) => {
      Image.findByIdAndRemove(req.params.id)
        .then(img => {
          if(!img) throw new Error('ENOENT : File not found');
          res.sendStatus(204);
        })
        .catch(err => errorHandler(err,res));
    });
  
};