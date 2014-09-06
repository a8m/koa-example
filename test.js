var co = require('co');
var users = require('./controller/users.js').users;

var app = require('./app.js');
var request = require('supertest').agent(app.listen());

describe('Simple User Api:', function() {

	var test_user  = { name: 'Ariel', city : 'Tel Aviv, Israel'};

	it('creates a new user', function(done){
		// Post
		request
			.post('/users')
			.send(test_user)
			.expect('location', /^\/users\/[0-9a-fA-F]{24}$/) // Mongo Object Id /user/234234523562512512
			.expect(200, done);
	});


	var removeAll = function(done){
		co(function *(){
			yield users.remove({});
		})(done);
	};

	beforeEach(function (done) {
		removeAll(done);
	});

	afterEach(function (done) {
		removeAll(done);
	});

	it('get existing user', function (done) {
		co(function *() {
			// Insert test user in database
			var user = yield users.insert(test_user);
			var userUrl = '/users/' + user._id;

			// Get
			request
				.get(userUrl)
	      		.set('Accept', 'application/json')
	      		.expect('Content-Type', /json/)
	      		.expect(/Ariel/)
	      		.expect(/Tel Aviv, Israel/)
	      		.expect(200, done);
	    })();
	});

	it('updates an existing user', function(done){
		co(function *() {
			// Insert test user in database
			var user = yield users.insert(test_user);
			var userUrl = '/users/' + user._id;

			request
				.put(userUrl)
				.send({name: 'Ariel v2', city: 'Tel Aviv Updated'})
				.expect('location', userUrl)
				.expect(204, done);
		})();
	});

	it('deletes an existing user', function(done){
		co(function *() {
			// Insert test user in database
			var user = yield users.insert(test_user);
			var userUrl = '/users/' + user._id;

			// Delete the user
			request
				.del(userUrl)
				.expect(200, done);
		})();
	});
});
