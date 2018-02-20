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

