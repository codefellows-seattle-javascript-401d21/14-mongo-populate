'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;
// const mongoConnection = mongoose.connect(MONGODB_URI)
// console.log(MONGODB_URI)

app.use(cors());
app.use('/api/v1', router);
require('../route/route-animal')(router);
require('../route/route-farm')(router);
app.use('/{0,}', (req, res) => errorHandler(new Error('Path error. Route not found. From server.js'), res));

let server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject('server is already on');

    server.http = app.listen(PORT, () => {
      console.log('server up', PORT);
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
      console.log('server down');
      mongoose.disconnect();
      server.isOn = false;
      return resolve();
    });
  });
};

