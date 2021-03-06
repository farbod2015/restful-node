// create a reference to ...
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    
// open a connection to the database
var db = mongoose.connect('mongodb://localhost/bookAPI');

// create a reference to bookModel
var Book = require('./models/bookModel');

// create an instance of express
var app = express();

// set up a port
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

// setup a base for where our API route is going to be. This will be the root of all of our routes
app.use('/api/books', bookRouter)
//app.use('/api/authors', authorRouter)

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
