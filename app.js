// create a reference to express
var express = require('express');

// create an instance of express
var app = express();

// set up a port
var port = process.env.PORT || 3000;

// set up a handler for our route
// parameters: '/' root of the site
//             callback function: parameters: req: the request that was sent by the client
//                                            res: the response that we're going to send back
app.get('/', function(req, res){
  res.send('welcome to my API!');
});

// have the express start listening on the port
// parameters: port
//             callback function: in this case a message that we are listening
app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
});
