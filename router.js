
var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();



const tasksController = require('./controller/tasks_controller.js');
var modelos = require ('./models/modelos').modelos;

app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());

const jsrsasign = require('jsrsasign');

app.post('/api/tasks', tasksController.agregar);

app.get('/api/tasks', tasksController.mostrar);

app.delete('/api/tasks/:id', tasksController.eliminar)

app.post('/api/auth/token', tasksController.getToken )


exports.app = app;