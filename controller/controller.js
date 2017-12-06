var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var model = require ('../models/model').model;
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
 

const jsrsasign = require('jsrsasign');
app.use(bodyParser.json());
exports.agregar = function(request, response){  

  response.setHeader('Content-Type', 'application/json');
  console.log(request.body.text);
  if (request.body.text && request.body.done && request.body.date) {
    if(model.length>0){
      var num = (model[model.length-1].id);
    }
    else{
      num = 0;
    }
    request.body.id = num+1;
    request.body.createdAt = new Date();
    request.body.updatedAt = new Date();
    model.push(request.body);
    response.send('{"id:":'+request.body.id+'}'); 
  }else{
    response.status(400);
    response.send("Not Found");
  }
  
};

exports.mostrar = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    response.send(model);
};

exports.eliminar = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    var error = false;
    for (var i = 0; i < model.length; i++){
      if (model[i].id == request.params.id){
        model.splice(i,1);
        response.send("Borrado");
      }
    }
      response.send("No se encontró");
};

exports.getToken = function(request,response){
  
  response.setHeader('Content-Type', 'application/json');
  var usernameR = request.body.username;
  var passw = request.body.password;

  let header = {
    alg: "HS256",
    typ: "JWT"
  };

  let payload = { 
  };

  
  payload.iat = jsrsasign.jws.IntDate.get('now'); 
  payload.user = usernameR;
  payload.pass = passw;

  payload.secretCode = 'p4ssw0d';
  payload.currentState = 'purchase-cart';

  let secret_phrase = passw;
  let jwt = jsrsasign.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secret_phrase);

  jwtRes = {"token": jwt}
  response.send(jwtRes);
};