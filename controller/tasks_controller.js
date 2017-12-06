var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var modelos = require ('../models/modelos').modelos;
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
 

const jsrsasign = require('jsrsasign');
// parse application/json
app.use(bodyParser.json());
exports.agregar = function(request, response){  

  response.setHeader('Content-Type', 'application/json');
  console.log(request.body.text);
  if (request.body.text && request.body.done && request.body.date) {
    if(modelos.length>0){
      var numero = (modelos[modelos.length-1].id);
    }
    else{
      numero = 0;
    }
    request.body.id = numero+1;
    request.body.createdAt = new Date();
    request.body.updatedAt = new Date();
    modelos.push(request.body);
    // console.log(request.body);      // your JSON
    response.send('{"id:":'+request.body.id+'}');    // echo the result back
  }else{
    response.status(400);
    response.send("Not Found");
  }
  
};

exports.mostrar = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    response.send(modelos);
};

exports.eliminar = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    var error = false;
    for (var i = 0; i < modelos.length; i++){
      if (modelos[i].id == request.params.id){
        modelos.splice(i,1);
        response.send("Eliminado");
      }
    }
      response.send("Not Found");
};

exports.getToken = function(request,response){
  
  response.setHeader('Content-Type', 'application/json');
  // Header
  var usernameR = request.body.username;
  var passwordR = request.body.password;

  let header = {
    alg: "HS256",
    typ: "JWT"
  };

  //Payload
  let payload = { 
  };

  // Reserved claims (metadata of the JWT)
  payload.iat = jsrsasign.jws.IntDate.get('now'); // Fecha de generacion
  // payload.exp = jsrsasign.jws.IntDate.get('now + 1day'); // Fecha de expiración
  payload.user = usernameR;
  payload.pass = passwordR;

  // Private claims (our info we want to send)
  payload.secretCode = 'p4ssw0d';
  payload.currentState = 'purchase-cart';

  // Signature = (header + payload + secret_phrase) * algoritmo
  let secret_phrase = passwordR;
  let jwt = jsrsasign.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secret_phrase);

  jwtResultado = {"token": jwt}
  // Envia un JWT generado
  response.send(jwtResultado);
};