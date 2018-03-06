'use strict';

// app dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('http:server');
const errorHandler = require('./error-handler');

// app setup
const app = express();
const router = express.Router();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// middleware
app.use(cors());
app.use('api/v1', router);
require('../route/route-note')(router);
require('../route/route-author')(router);

// 404 error handler
app.use('/{0,}', (req, res) => errorHandler(new Error('Path error. Route not found.'), res));

// server controls
let server = module.exports = {};

server.start = () => {
    return new Promise((resolve, reject) => {
        if (server.isOn) return reject(new Error('Error: server already running.'));

        server.http = app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
            mongoose.connect(MONGODB_URI);
            server.isOn = true;
            return resolve(server);
        });
    });
};

server.stop = () => {
    return new Promise((resolve, reject) => {
        if (!server.isOn) return reject(new Error('Error: server not running.'));

        server.http.close(() => {
            console.log('Shutting down server.');
            mongoose.disconnect();
            server.isOn = false;
            return resolve(server);
        });
    });
};