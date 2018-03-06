'use strict';

require('dotenv').config();
require('./lib/server').start();
const debug = require('debug')('http:index');