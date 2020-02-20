var express = require('express');
var path = require('path');
var app = express();
// include req.body
const bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())

// include .env config
require('dotenv').config();

// view engine setup
var indexRouter = require('./routes/index');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', indexRouter);
app.use(express.static('public'));

// connect databases
require('./src/controler/base/mysql/mysql');

const routes = require('./src/routes');
app.use(process.env.version||"/api/v1" , routes); 

const socket = require('./src/socket')

module.exports = app;


