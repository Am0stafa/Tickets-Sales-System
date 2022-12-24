var server = require('./infrastructure/test-server');
var http = require('http');

var port = 3010;
var baseUrl = 'http://localhost:' + port;

describe('Express Defend (maxAttempts=2, dropSuspiciousRequests=true)', function () {

	var expressDefendConfig = { maxAttempts: 2, dropSuspiciousRequest: true, consoleLogging: false };

	it('should allow normal requests', function (done) {

		var test = function() {

			http.get(baseUrl + '/', function (res) {
		      expect(res.statusCode).toBe(200);
		      http.get(baseUrl + '/', function (res) {
				    expect(res.statusCode).toBe(200);
					http.get(baseUrl + '/', function (res) {
						expect(res.statusCode).toBe(200);
						done();
			            server.close();
					});
			    });
		    });
		};

		server.ensureStarted({ port: port, expressDefendConfig: expressDefendConfig }, test);
	});

	it('should deny second malicious request', function (done) {

		var test = function() {

			http.get(baseUrl + '/?name=<script', function (res) {
		      expect(res.statusCode).toBe(200);

		      http.get(baseUrl + '/?name=<script', function (res) {
			      expect(res.statusCode).toBe(403);
			      done();
			      server.close();
			    });
		    });
		};

		server.ensureStarted({ port: port, expressDefendConfig: expressDefendConfig }, test);
	});

	it('should deny second malicious request, even if callback is buggy', function (done) {

		var test = function() {

			http.get(baseUrl + '/?name=<script', function (res) {
		      expect(res.statusCode).toBe(200);

		      http.get(baseUrl + '/?name=<script', function (res) {
			      expect(res.statusCode).toBe(403);
			      done();
			      server.close();
			    });
		    });
		};

		expressDefendConfig.onMaxAttemptsReached = function() { throw new Error('The show must go on'); }
		server.ensureStarted({ port: port, expressDefendConfig: expressDefendConfig }, test);
	});

});