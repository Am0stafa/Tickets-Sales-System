var expressDefend = null; // System under test

var responseMock = { 
	status: function(statusCode) { 
		this.statusCode = statusCode; 
		return { send: function() {} };
	} 
};

// Mocking helpers
var nextMockInvoked = false;
var nextMock = function() { nextMockInvoked = true; };

function getMaliciousRequest() {
	return { 
		originalUrl: '/?page.html?name=<script>alert("hello world")</script>', 
		headers: { }, 
		connection: { remoteAddress: '127.0.0.1' }
	};
}

describe("Cross Site Scripting", function() {
 
  beforeEach(function() { 
  	nextMockInvoked = false;

  	// Reset system-under-test
  	expressDefend = require('../index');
  	expressDefend.blacklistCandidates = [];
  });

  it('is detected', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 1 });
	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(false);
  });

  it('is detected (case insensitively)', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 1 });
	var request = getMaliciousRequest();
	request.originalUrl = '/?page.html?name=<ScRiPt';

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(false);
  });

  it('is detected (\\x3cscript)', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 1 });
	var request = getMaliciousRequest();
	request.originalUrl = '/?page.html?name=\\x3cscript';

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(false);
  });

});