var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var http = require('http');
var Client = require('node-rest-client').Client;
var client = new Client();
/* GET home page. */
router.post('/', function(req, res)  {
  console.log("inside the service router");
  var errorMessage = {"status":"error","message":"Error while processing the request"};
  var args = {
    data: JSON.parse(req.body.json),
    headers:{"Content-Type": "application/json"}
  };
  client.post("http://localhost:8080/"+req.body.serviceId, args, function(data,response) {
    res.json(data);
    console.log(data);
  }).on('error',function(err){
      res.json(errorMessage);
  });

});

module.exports = router;