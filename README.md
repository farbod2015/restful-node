# restful-node









## What Is REST?

The term REST comes from a dissertation written by Roy Fielding back in 2000. In this dissertation he coins the term _Representational State Transfer_ or _ReST_. In this chapter of the dissertation he begins to layout a series of constraints that should be in place whenever two systems talk to each other, so ultimately REST is just a series of rules in place for your server, so that everyone that uses your service understands what it does and how it works.                                     Let's take a look at these constraints and see if we can't make sense of what he's talking about. The first constraint is the Client Server constraint. All that means is that you have a client and a server and the client sends a request to the server, the server sends a response back to the client. This should seem pretty straightforward to you, in fact, this is the way the web works, and chances are if you're watching this video you do some stuff in the web and this is how you understand most things to work. There's no tricks here it's just that, client sends a request, server sends a response, that's how that works. The next constraint is the constraint of the Stateless Server. As the load from the client increases on your server you start to add more servers to the mix and when that happens now you get into a situation where the server may contain some information about the client that doesn't transfer from one server to the other. In this constraint Roy Fielding suggests that you don't get into that situation. Ultimately the client sends a request to the server and it doesn't matter what server it goes to, so everything that the server's going to need to process this request should be included in that request, and then based on that request and based on all that information that's in the request it'll send a response to the server. If you find yourself on the server storing information about the request or about the client, then you're not writing a truly RESTful service. The next constraint is the constraint of caching, so ultimately as servers are sending responses back full of data, sometimes you're sending back data that doesn't change very often, so think about a list of clients or a list of book authors or something along those lines. That data's not going to change between now and 5 minutes from now the next time the client pulls that data, so this constraint says let the client know how long this data is good for, so that the client doesn't have to come back to the server for that data over and over again. We're not going to go too deep into this one in this course, but I just wanted to make sure you understood what that meant and how that works.

Uniform Interface
The last constraint we'll talk about is the constraint of the Uniform Interface. Basically what Roy Fielding's talking about here is when you're dealing with an interface for a RESTful service it will behave in a very specific way that is uniform from one service to the next, and in this he outlines four pieces to an interface that should always operate this way, the first one being the idea of resources. Whenever you're dealing with a RESTful service you'll be dealing with a resource or a series of resources and all that really means is you're dealing with nouns. Uniform Interfaces are built around things, not actions. Sometimes when you call a service it'll be authorize or login. Those are verbs. In ReST everything we're going to be dealing with is nouns, so for this project we're going to be working with books and authors. Both of these are the resources that each of our ReSt services will be dealing with. For example, dealing with a book, the URL will be HTTP://something/book. If we're dealing with authors it would be /author. That's the way a ReSt Service will be defined every time. The second piece of a uniform interface is contained within the HTTP verbs. The HTTP verbs that we use I our request will dictate the type of activity we're trying to do on the resource. For example, our HTTP Get will simply request data, so I'm just trying to get data, and it'll either return a list of objects or a specific object. The post is used to add data, so if I do post to a /book I'm going to add a new book. Delete will remove. Put is used to update, so if I would just want to update or replace a resource I use Put. Patch is coming more into favor now too for just updating a piece of our resource. Put updates the entire resource, patch will just update a piece of that resource. The last piece of the Uniform Interface is the acronym HATEOUS, which has to be the coolest acronym that we have in REST. HATEOS stands for Hypermedia as the Engine of Application State, which I know is not very descriptive at all. Basically all that means is that in each request will be a set of hyperlinks that you can use to navigate the API. It's just the API's way of letting you know what other actions you can take on this particular resource. Don't worry about that one too much right now, we will get into that later on in this course.




















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

      var query = {};

      if (req.query.genre)
      {
        query.genre = req.query.genre;
      }

      Book.find(query, function(err,books){
        if(err)
          res.status(500).send(err);
        else
          res.json(books);
      });
    });
```

## Route parameters

Route parameters are named URL segments used to capture the values specified at their position in the URL. The named segments are prefixed with a colon and then the name (e.g. `/:your_parameter_name/`. The captured values are stored in the `req.params` object using the parameter names as keys (e.g. `req.params.your_parameter_name`).

So for example, consider a URL encoded to contain information about users and books: `http://localhost:3000/users/34/books/8989`. We can extract this information as shown below, with the `userId` and `bookId` path parameters:

```js
app.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
})
```

The names of route parameters must be made up of “word characters” (A-Z, a-z, 0-9, and _).

```js
// app.js

bookRouter.route('/Books/:bookId')
.get(function(req, res){

  Book.findById(req.params.bookId, function(err,book){
    if(err)
      res.status(500).send(err);
    else
      res.json(book);
  });
});
```

## Postin Data

* the beauty of the router is that we can chain calls together (e.g. .post, .get, .put, etc.)

* in order to get access to that post data we're going to have to use something called a _body parser_ and basically the _body parser_ is a piece of middleware that allows Express to read the body and then parse that into a JSON object that we can understand:

```none
npm install body-parser --save
```

```js
```














