'use strict';

const Champ = require('../model/champ');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  // router.get()
  // router.post()

  // Below is another example of mounting route methods to the router
  router.route('/champ/:_id?')
    .get((req, res) => {
    // debug(`${req.method}: ${req.url}`)

      if(req.params._id) {
        return Champ.findById(req.params._id)
          .then(champ => {
            champ ? res.status(200).json(champ) : errorHandler(new Error('ENOENT'), res);
          })
          .catch(err => errorHandler(err, res));
      }

      // otherwise handle the case of no ID
      return Champ.find()
        .then(champsArr => champsArr.map(champsArr => champsArr._id))
        .then(champIDs => res.status(200).json(champIDs))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Champ(req.body).save()
        .then(champ => res.status(201).json(champ))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      return Champ.findByIdAndUpdate(req.params._id, req.body, {runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    // .delete((req, res) => {
    //   return Champ.findByIdAndRemove(req.params._id)
    //     .then(() => res.sendStatus(204))
    //     .catch(err => errorHandler(err, res));
    // });

    .delete((req, res) => {
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Champ.findById(req.params._id)
        .then(champ => champ.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });

};