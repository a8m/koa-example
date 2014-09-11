var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');
var logger = require('koa-logger');

app.use(logger());

 ///////////////
//   routes  //
//////////////

// users
var userController = require('./controller/users.js');
app.use(routes.post('/users', userController.add));
app.use(routes.get('/users/:id', userController.get));
app.use(routes.get('/users', userController.getAll));
app.use(routes.put('/users/:id', userController.update));
app.use(routes.del('/users/:id', userController.remove));

//cats
var catController = require('./controller/cats.js');
app.use(routes.post('/cats', catController.add));

//http.createServer(app.callback()).listen(3000);
app.callback = function() {
  console.log('The app is listening. Port: %d', 3000);
};

// Fire it up
app.listen(3000);
