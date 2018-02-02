'use strict';

const debug = require('debug')('http:server');

// Application Dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const eH = require('./error-handler');

// Application Setup
const app = express();
const PORT = process.env.PORT;
//console.log(PORT);
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
//console.log(MONGODB_URI);

// Middleware
app.use(cors());
app.use('/api/v1', router);
require('../route/route-book')(router);
app.use('/{0,}', (req, res) => {

  debug('here is path error in server.js');

  eH(new Error('Path error.'), res);
});

// Server Controls
const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn){
      return reject(new Error('Server running.'));
    }

    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      return reject(new Error('Server not running.'));
    }

    server.http.close(() => {
      console.log(`Shutting down server`);
      mongoose.disconnect();
      server.isOn = false;
      return resolve(server);
    });
  });
};
