//test mongoose with koa
var thunkify = require('thunkify');
var parse = require("co-body");
var mongoose = require('mongoose');
var wrap = require('../co-mongoose');

mongoose.connect('localhost/catsApi');

var db = mongoose.connection;

var kittySchema = mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

module.exports = {

  add: function* () {
    var body = yield parse(this);

    var cat = new Kitten(body);
    cat.save = thunkify(cat.save);

    yield cat.save();

    this.status = 200;
    this.body = body;
  }

};
