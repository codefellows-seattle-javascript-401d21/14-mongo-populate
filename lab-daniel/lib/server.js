'use strict';

// App Dependencies

const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler');
const mongoose = require('mongoose');

// App Setup

const app = express();
const router = express.Router();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware

app.use(cors());
app.use('/api/v1', router);
require('../route/route-star')(router);
require('../route/route-type')(router);
app.use('/{0,}', (req, res) => 
  errorHandler(new Error('Path Error: No Route Found.'), res));

// Server Controls
const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server already running, cannot start'))

    server.http = app.listen(PORT, () => {
      console.log(`Listening On ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};


server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) return reject(new Error('Server not running, cannot stop'))

    server.http.close(() => {
      console.log(`Shutting Down Server`);
      server.isOn = false;
      mongoose.disconnect();
      return resolve(server);
    });
  });
};
