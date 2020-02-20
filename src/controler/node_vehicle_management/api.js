/**
 * @version 1.0.0
 */

const express = require('express');
const api = express();
const {
    list_nodeVehicle,
    get_nodeDeviceById,
    delete_rfidExist,
    add_nodeVehicleComein,
    comeinOneStep,
    update_destinationId,
    get_nodeDeviceByRfid,
    directVehicle,
    mdw_getIdFromRfid,
} = require("./service");

const {mdw_nodeDevice_exist_allowEmpty,
    mdw_nodeDevice_exist
} = require('../node_management/service')


api.get('/', mdw_nodeDevice_exist_allowEmpty,list_nodeVehicle);
api.get('/byid/:id', get_nodeDeviceById);
api.get('/byRfid/:rfid', get_nodeDeviceByRfid);
api.delete('/:rfid', delete_rfidExist);
// api.get('/:id', get_nodeDevice);
api.post('/comein', add_nodeVehicleComein);
api.post('/comeinOneStep', comeinOneStep); // dùng với TH nếu không có thì add nếu có thì chỉ đường
api.post('/directVehicle', mdw_nodeDevice_exist,directVehicle);
// api.post('/addlist', add_list_nodeDevice);
api.patch('/',mdw_nodeDevice_exist,mdw_getIdFromRfid,update_destinationId);

module.exports = api;
