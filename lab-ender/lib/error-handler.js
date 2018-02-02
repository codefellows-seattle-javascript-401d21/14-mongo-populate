'use strict';

const debug = require('debug')('http:error-handler');

const errorHandler = function(err, res) {
  debug(`handling: ${err.name}`)
  let msg = err.message.toLowerCase();

  switch (true) {
    case msg.includes('validation'): {
      debug('validation case');
      return res.status(400).send(`${err.name}: ${err.message}`);
    }
    case msg.includes('enoent'): {
      debug('enoent case');
      return res.status(400).send(`${err.name}: ${err.message}`);
    }
    case msg.includes('cast'): {
      debug('cast case');
      return res.status(400).send(`${err.name}: ${err.message}`);
    }
    case msg.includes('path error'): {
      debug('path case');
      return res.status(404).send(`${err.name}: ${err.message}`);
    }
    case msg.includes('objectid failed'): {
      debug('objectid case');
      return res.status(404).send(`${err.name}: ${err.message}`);
    }
    case msg.includes('duplicate key'): {
      debug('duplicate key case');
      return res.status(409).send(`${err.name}: ${err.message}`);
    }
    default: {
      debug('default (500)');
      return res.status(500).send(`${err.name}: ${err.message}`);
    }
  };
};
