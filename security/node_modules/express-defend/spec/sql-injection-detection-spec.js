
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

function getSampleRequest() {
  return { 
    originalUrl: '/?page.html?name=<script>alert("hello world")</script>', 
    headers: { }, 
    connection: { remoteAddress: '127.0.0.1' }
  };
}

describe("SQL Injection", function() {
 
  beforeEach(function() { 
    nextMockInvoked = false;

    // Reset system-under-test
    expressDefend = require('../index');
    expressDefend.blacklistCandidates = [];
  });

  it('is detected', function() {

    // Arrange
    var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 1 });
    var request = getSampleRequest();
    request.originalUrl = '/?page.html?name=" or "1"="1';

    // Act
    interceptor(request, responseMock, nextMock);

      // Assert
    expect(nextMockInvoked).toBe(false);
  });

  
});