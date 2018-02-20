# restful-node

## Set up the environment

* In terminal:

```none
npm init
npm install express --save
```

* create `app.js`:

```js
//app.js

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
  console.log('Running on PORT: ' + port);
});
```

* **Note:** Gulp restarts the server everytime we make a change to the code
* **Note:** use -g tag and install gulp again to have access to it from the command line (first install updates the dependencies in package.json)

```none
node app.js
npm install gulp --save
npm install gulp -g
```

* **Note:** Gulp is just a task runner so we are going to need nodemon plugin

```none
npm install gulp-nodemon --save
```

* create `gulpfile.js` (gulp looks for it automatically):

```js
// gulpfile.js

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT:8000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('Restarting');
  })
});
```

## Implementing HTTP Get

* there are different ways to create routes. One way is `app.get` as we did before, but if we are going to have multiple routes a better way is to use `express.Router`:

```js
// inside app.js

// create an instance of the Router to define all of our routes
var bookRouter = express();

bookRouter.route('/Books')
    .get(function(req, res){
      var responseJson = {hello: "This is my api"};
      res.json(responseJson);
    });

// setup a base for where our API route is going to be. This will be the root of all of our routes
app.use('/api', bookRouter)
```

* **Note:** use JSONView plugin on Chrome to get a formatted json

## Wiring up to MongoDB and Mongoose

* Now that we have our API working we want to hook it up to a real database on the backend, so that we can return some real data.

* install mongoDB and create the database bookAPI with some data

* install mongoose:

```none
npm install mongoose --save
```

* what Mongoose does is essentially like what Entity Framework would be in the .NET world. It's going to take the data in Mongo and convert it into JSON objects that we can then use in our application.

* we need to open a connection to the database using `mongoose.connect`

* the way that Mongoose knows how to translate the data that it gets out of MongoDB it uses a thing called a model:

```js
// bookModel.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: {
        type: String
    },
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

module.exports= mongoose.model('Book', bookModel);
```

```js
// app.js

// create a reference to mongoose
var mongoose = require('mongoose');

// open a connection to the database
var db = mongoose.connect('mongodb://localhost/bookAPI');

// create a reference to bookModel
var Book = require('./models/bookModel');

bookRouter.route('/Books')
    .get(function(req, res){
      Book.find(function(err,books){
        if(err)
          res.status(500).send(err);
        else
          res.json(books);
      });
    });

```


