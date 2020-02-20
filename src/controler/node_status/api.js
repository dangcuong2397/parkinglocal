/**
 * @version 1.0.0
 */

const express = require('express');
const api = express();
const {list_nodeStatus,add_nodeStatus,edit_nodeStatus} = require("./service");

const {mdw_nodeDevice_exist} = require('./../node_management/service')
api.get('/', list_nodeStatus);
api.post('/', mdw_nodeDevice_exist, add_nodeStatus);
// api.patch('/:id', mdw_nodeDevice_exist, edit_nodeStatus);

module.exports = api;
