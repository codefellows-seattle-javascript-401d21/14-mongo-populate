'use strict';

const debug = require('debug')('http:error-handler');

module.exports = function(err, res){
//console.log('err', err);
  debug('Inside of error handler');

  let msg = err.message.toLowerCase();

  debug(`err msg -> ${msg}`);

  if(msg.includes('validation error')){
    debug('400');
    return res.status(400).send(`${err.name}: ${err.message}`);
  }
  if(msg.includes('enoent')){
    debug('404');
    return res.status(404).send(`${err.name}: ${err.message}`);
  }
  if(msg.includes('path error')){
    debug('404');
    return res.status(404).send(`${err.name}: ${err.message}`);
  }
  if(msg.includes('objectid failed')){
    debug('404');
    return res.status(404).send(`${err.name}: ${err.message}`);
  }
  if(msg.includes('duplicate key')){
    debug('409');
    return res.status(409).send(`${err.name}: ${err.message}`);
  }

  debug('500');
  return res.status(500).send(`${err.name}: ${err.message}`);
};
