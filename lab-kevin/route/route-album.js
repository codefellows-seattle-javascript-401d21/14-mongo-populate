'use strict';

'use strict';

const bodyParser = require('body-parser').json();
const Album = require('../model/album');
const errorHandler = require('../lib/error-handler');
const debug = require('debug');

module.exports = function(router){

  router.route('/:id?')
    .get()
    .post(bodyParser, (req, res) => {
      Album(req.body).save()
        .then(img => res.status(201).send(img))
        .catch(err => errorHandler(err,res));
    })
    .put()
    .delete();
  
};