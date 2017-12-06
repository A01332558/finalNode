
var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();



const controller = require('./controller/controller.js');
var model = require ('./models/model').model;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const jsrsasign = require('jsrsasign');

app.post('/api/tasks', controller.agregar);

app.get('/api/tasks', controller.mostrar);

app.post('/api/auth/token', controller.getToken );

app.delete('/api/tasks/:id', controller.eliminar);

exports.app = app;