var parse = require("co-body");

var monk = require("monk");
var wrap = require("co-monk");
var db = monk("localhost/usersApi");
var users = wrap(db.get("users"));

module.exports = {

  //DB connection
  users: users,

  // Add user
  add: function *() {
    var postedUser = yield parse(this);

    var insertedUser = yield users.insert(postedUser);

    this.set("location", "/users/" + insertedUser._id);
    this.status = 200;
    this.body = insertedUser;
  },

  // Get user
  get: function *(id) {
    this.body = yield users.findById(id);
    this.status = 200;
  },

  // Get all users
  getAll: function *() {
    this.body = yield users.find({});
    this.status = 200;
  },

  // Update user
  update: function *(id) {
    var userFromRequest = yield parse(this);

    yield users.updateById(id, userFromRequest);

    this.set("location", "/users/" + id);
    this.status = 204;
  },

  // Remove user
  remove: function *(id) {
    yield users.remove({_id : id});
    this.status = 200;
  }

};