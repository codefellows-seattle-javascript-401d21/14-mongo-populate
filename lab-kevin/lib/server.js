'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


const app = express();
const router = express.Router();

require('../route/route-image')(router);
require('../route/route-album')(router);

app.use(cors());
app.use('/api/v1', router);
app.use('/*',  (req, res) => errorHandler(new Error('Path error: Route does not exist'), res));

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) return reject(new Error('Server Running'));
    server.http = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
    mongoose.connect(MONGODB_URI);
    server.isOn = true;
    return resolve ();
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server is stopped'));
    mongoose.disconnect();
    server.http.close();
    server.isOn = false;
    return resolve();
  });
};
