'use strict';

// app dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('http:server');
const errorHandler = require('./error-handler');

// app setup
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URL = process.env.MONGODB_URL;

// middleware
app.use(cors());
app.use('api/v1', router);
require('../route/route-track')(router);
app.use('/{0,}', (req, res) => {
  return errorHandler(new Error('Path error. Route not found.', res));
});

// server controls
const server = {}

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) {
      return reject(new Error('Server running. Cannot start server.'));
    }
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      debug(`Listening on ${PORT}`);
      mongoose.connect(MONGODB_URL);
      server.isOn = true;
      return resolve(server);
    });
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      return reject(new Error('Server not running. Cannot stop server.'))
    }
    mongoose.disconnect();
    server.isOn = false;
    return resolve(server);
  });
};

module.exports = server;
