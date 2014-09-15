var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');
var logger = require('koa-logger');

app.use(logger());
app.use(errorHandler());

// routes
var userController = require('./controller/users.js');
app.use(routes.post('/users', userController.add));
app.use(routes.get('/users/:id', userController.get));
app.use(routes.get('/users', userController.getAll));
app.use(routes.put('/users/:id', userController.update));
app.use(routes.del('/users/:id', userController.remove));

function errorHandler() {
  return function* (next) {
    //try catch all downstream here
    try {
      yield next;
    } catch (err) {
      //set response status
      this.status = 500;
      //set response body
      this.body = 'Internal server error';
      //emit event for log
      this.app.emit('error', err, this);
    }
  }
}

//http.createServer(app.callback()).listen(3000);
app.callback = function() {
  console.log('The app is listening. Port: %d', 3000);
};

// Fire it up
app.listen(process.argv[2] || 3000);
