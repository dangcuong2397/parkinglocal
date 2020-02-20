/**
 * @version 1.0.0
 */

const express = require('express');
const api = express();
const {list_nodeDevice,get_nodeDevice,add_nodeDevice,edit_nodeDevice,mdw_nodeDevice_exist,add_list_nodeDevice} = require("./service");


api.get('/', list_nodeDevice);
api.get('/:id', get_nodeDevice);
api.post('/', add_nodeDevice);
api.post('/addlist', add_list_nodeDevice);
api.patch('/:id',mdw_nodeDevice_exist, edit_nodeDevice);

module.exports = api;
