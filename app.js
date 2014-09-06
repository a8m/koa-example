var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');

// routes
var userController = require('./controller/users.js');
app.use(routes.post('/users', userController.add));
app.use(routes.get('/users/:id', userController.get));
app.use(routes.get('/users', userController.getAll));
app.use(routes.put('/users/:id', userController.update));
app.use(routes.del('/users/:id', userController.remove));

// Fire it up
app.listen(3000);
console.log('The app is listening. Port 3000');
