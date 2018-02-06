'use strict';

//Aplication dependancies
const express = require('express');
const errorHandler = require('./error-handler');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('http:server');

//Application Set Up
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;

//Middleware
require('../route/route-book')(router);
require('../route/route-author')(router);
app.use(cors());
app.use('/api/v1', router);

// 404 Error Handler
app.all('/*', (req, res) => errorHandler(err, res));

//Server controls
let server = module.exports = {};
debug('server');

server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn)
      return reject('Server running.  Cannot start server again.');

    server.http = app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
      mongoose.connect(MONGODB_URI);
      server.isOn = true;
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject();

    server.http.close(() => {
      console.log('Server shut down.');
      mongoose.disconnect();
      server.isOn = false;
      return resolve();
    });
  });
};
