/**
 * @version 1.0.0
 */

const express = require('express');
const api = express();

const {addAdv,map} = require('./service')
api.get('/addadv', addAdv);
api.get('/map', map);

module.exports = api;
