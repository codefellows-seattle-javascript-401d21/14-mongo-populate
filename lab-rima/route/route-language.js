'use strict';

const Language = require('../model/language');
const bP = require('body-parser').json();
const eH = require('../lib/error-handler');
const debug = require('debug')('http:route-language');


module.exports = function(router) {

  debug('Inside of function(router) in route-language.js');

  router.route('/language/:_id?')

    .get((req, res) => {

      debug(`Inside of get method. method and url: ${req.method}: ${req.url}`);

      // get a specific data
      if(req.params._id) {

        debug(`Inside of get one. id: ${req.params._id}`);

        return Language.findById(req.params._id)
          .then(language => res.status(200).json(language))
          .catch(err => eH(err, res));
      }

      debug(`Inside of get all.`);
      // get all data
      return Language.find()
        .then(languages => res.status(200).json(languages))
        .catch(err => eH(err, res));

    })

    .post(bP, (req, res) => {

      debug(`Inside of post method. method and url: ${req.method}: ${req.url}`);

      new Language(req.body).save()
        .then(language => res.status(201).json(language))
        .catch(err => eH(err, res));
    })

    .put(bP, (req, res) => {

      debug(`Inside of put method. method and url: ${req.method}: ${req.url}`);

      return Language.findByIdAndUpdate(req.params._id, req.body)
        .then(language => res.status(204).json(language))
        .catch(err => eH(err, res));
    })

    .delete((req, res) => {

      debug(`Inside of delete method. method and url: ${req.method}: ${req.url}`);

      // delete a specific data
      if(req.params._id) {

        debug(`Delete one data. id: ${req.params._id}`);

        return Language.findByIdAndRemove(req.params._id)
          .then(() => res.status(204).end())
          .catch(err => eH(err, res));
      }

      debug('delete all');

      // delete all data
      return Language.remove({})
        .then(() => res.status(200).end())
        .catch(err => eH(err, res));

    });
};
