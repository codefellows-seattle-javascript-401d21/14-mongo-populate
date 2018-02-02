'use strict';

// Application Dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use('/api/v1', router);
require('../route/route-student')(router);
require('../route/route-student')(router);

// 404 Error Handler
app.use('/{0,}', (req, res) => errorHandler(new Error('Path error. Route not found.'), res));

// Server Controls
const server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) return reject(new Error('Server running. Cannot start again.'));
    debug('#server.start: Starting Server');

    server.http = app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
      debug(`MONGODB_URI: ${MONGODB_URI}`);
      mongoose.connect(MONGODB_URI);
      server.isOn = true;
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) return reject(new Error('Server is not running. Cannot shut down.'));
    debug('#server.stope: Stopping Server');

    server.http.close(() => {
      console.log('Shutting down server');
      mongoose.disconnect();
      server.isOn = false;
      return resolve(server);
    });
  });
};
