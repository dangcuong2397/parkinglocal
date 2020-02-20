const express = require('express');
const router = express();

const nodeManagement = require('./controler/node_management/api');
router.use('/node_management', nodeManagement);
const nodeStatus = require('./controler/node_status/api');
router.use('/node_status', nodeStatus);
const vehicleManagement = require('./controler/node_vehicle_management/api');
router.use('/vehicle_management', vehicleManagement);
const media = require('./controler/media_management/api');
router.use('/media', media);

const {socket} = require('./controler/media_management/socket');

module.exports = router;