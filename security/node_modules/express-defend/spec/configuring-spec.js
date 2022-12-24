var expressDefend = null; // System under test
var fsHelper = require('fs');

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

function getNormalRequest() {
	return { 
		originalUrl: '/?page.html?name=john', 
		headers: { }, 
		connection: { remoteAddress: '127.0.0.1' }
	};
}

function fileExists(filename) {
	var fileExists = false;
    try {
		fsHelper.accessSync('suspicious.log', fsHelper.F_OK);
		return true;
    }
    catch (e) { 
    	return false;
    }
}

describe("Check configuration: ", function() {
 
  beforeEach(function() { 
  	nextMockInvoked = false;

  	// Reset system-under-test
  	expressDefend = require('../index');
  	expressDefend.setDefaults();
  	expressDefend.blacklistCandidates = [];

  	// Delete logfile if available
  	if (fileExists('suspicious.log')) {
		fsHelper.unlinkSync('suspicious.log');
  	}
  });

  // ------------------------------------------------------------------------------------
  // Config.dropSuspiciousRequest & maxAttempts
  // ------------------------------------------------------------------------------------
  it('dropSuspiciousRequest = false, allowing', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: false });
	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(true);
  });

  it('dropSuspiciousRequest = false, allowing after 2nd attempt as well', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: false });
	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
    nextMockInvoked = false;
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(true);
  });

  it('dropSuspiciousRequest = false, allowing after 2nd attempt even if maxAttempts is 1', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: false, maxAttempts: 1 });
	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
    nextMockInvoked = false;
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(true);
  });

  it('dropSuspiciousRequest = true, drop immediately', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 1 });
	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(false);
    expect(responseMock.statusCode).toBe(403);
  });

  it('dropSuspiciousRequest = true, drop after 2 attempts', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 2 });
	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    expect(nextMockInvoked).toBe(true);
    nextMockInvoked = false; // reset
	interceptor(request, responseMock, nextMock);

    // Assert
	expect(nextMockInvoked).toBe(false);
    expect(responseMock.statusCode).toBe(403);
  });

  it('dropSuspiciousRequest = true, normal request allowed', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ consoleLogging: false, dropSuspiciousRequest: true, maxAttempts: 1 });
	var request = getNormalRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
    expect(nextMockInvoked).toBe(true);
  });

  // ------------------------------------------------------------------------------------
  // Config.onMaxAttemptsReached
  // ------------------------------------------------------------------------------------
  
  it('onMaxAttemptsReached is triggered with default configuration - on first attempt', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvoked = false;
  	var notifiedUrl;
  	var notifiedIp;

	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		maxAttempts: 1,
		onMaxAttemptsReached: function(ip, url) { 
			onMaxAttemptsReachedInvoked = true; 
			notifiedUrl = url;
			notifiedIp = ip;
		} 
	});

	var request = getMaliciousRequest();
	request.connection.remoteAddress = '127.0.0.1';
	request.originalUrl = '/page.html?<script>alert';

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(onMaxAttemptsReachedInvoked).toBe(true);
	expect(notifiedUrl).toBe('/page.html?<script>alert');
	expect(notifiedIp).toBe('127.0.0.1');
  });

  it('onMaxAttemptsReached is triggered with default configuration - on first attempt, considering x-forwarded-for header (when our server is behind a proxy)', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvoked = false;
  	var notifiedUrl;
  	var notifiedIp;

	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		maxAttempts: 1,
		onMaxAttemptsReached: function(ip, url) { 
			onMaxAttemptsReachedInvoked = true; 
			notifiedUrl = url;
			notifiedIp = ip;
		} 
	});

	var request = getMaliciousRequest();
	request.connection.remoteAddress = '127.0.0.1';
	request.headers['x-forwarded-for'] = '192.168.1.2';
	request.originalUrl = '/page.html?<script>alert';

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(onMaxAttemptsReachedInvoked).toBe(true);
	expect(notifiedUrl).toBe('/page.html?<script>alert');
	expect(notifiedIp).toBe('192.168.1.2');
  });

  it('onMaxAttemptsReached is triggered with default configuration - on first attempt, with dropSuspiciousRequest enabled', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvoked = false;
	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: true, 
		maxAttempts: 1,
		onMaxAttemptsReached: function(ip) { 
			onMaxAttemptsReachedInvoked = true; 
		} 
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(onMaxAttemptsReachedInvoked).toBe(true);
  });

  it('onMaxAttemptsReached is triggered only once, when maxAttempts count is reached. no more calls later on', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvokedCount = 0;
	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		maxAttempts: 1,
		onMaxAttemptsReached: function(ip) { 
			onMaxAttemptsReachedInvokedCount++;
		} 
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
    interceptor(request, responseMock, nextMock);
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(onMaxAttemptsReachedInvokedCount).toBe(1);
  });

  it('onMaxAttemptsReached is triggered with default configuration - on first attempt, with buggy handler', function() {

  	// Arrange
	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: true, 
		maxAttempts: 1,
		onMaxAttemptsReached: function(ip) { 
			throw Error('The show must go on'); 
		} 
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	// interceptor should swallow error if onMaxAttemptsReached has a bug to prevent normal flow: this handler should have 
	// no impact on request processing.
  });

  it('onMaxAttemptsReached is triggered when maxAttempts is configured to be 1', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvoked = false;
	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		maxAttempts: 1,
		onMaxAttemptsReached: function() { 
			onMaxAttemptsReachedInvoked = true; 
		} 
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);

    // Assert
	expect(onMaxAttemptsReachedInvoked).toBe(true);
  });

  it('onMaxAttemptsReached is triggered after 2nd attempt', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvoked = false;
	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		maxAttempts: 2,
		onMaxAttemptsReached: function() { 
			onMaxAttemptsReachedInvoked = true; 
		} 
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
	expect(onMaxAttemptsReachedInvoked).toBe(false);
	var onMaxAttemptsReachedInvoked = false;

	interceptor(request, responseMock, nextMock);

    // Assert
    expect(onMaxAttemptsReachedInvoked).toBe(true);
  });

  it('onMaxAttemptsReached is triggered after 3rd attempt, having dropSuspiciousRequest enabled', function() {

  	// Arrange
  	var onMaxAttemptsReachedInvoked = false;
	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: true, 
		maxAttempts: 3,
		onMaxAttemptsReached: function() { 
			onMaxAttemptsReachedInvoked = true; 
		} 
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
	expect(onMaxAttemptsReachedInvoked).toBe(false);
	var onMaxAttemptsReachedInvoked = false;

	interceptor(request, responseMock, nextMock);
	expect(onMaxAttemptsReachedInvoked).toBe(false);
	var onMaxAttemptsReachedInvoked = false;

	interceptor(request, responseMock, nextMock);

    // Assert
    expect(onMaxAttemptsReachedInvoked).toBe(true);
  });

  // ------------------------------------------------------------------------------------
  // Config.logFile
  // ------------------------------------------------------------------------------------

  it('logFile - default configuration has no file logging', function() {

  	// Arrange
  	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		maxAttempts: 1
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
	
    // Assert
    expect(fileExists('suspicious.log')).toBe(false);
  });

  it('logFile disabled explicitly - no logging', function() {

  	// Arrange
  	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		logFile: null,
		maxAttempts: 1
	});

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
	
    // Assert
    expect(fileExists('suspicious.log')).toBe(false);
  });

  it('logFile enabled, log suspicious request', function() {

  	// Arrange
  	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		logFile: 'suspicious.log',
		maxAttempts: 1
	});

	expressDefend.fileAppender = fsHelper.appendFileSync; // we need to write file synchronously so that we can validate the result

	var request = getMaliciousRequest();

	// Act
    interceptor(request, responseMock, nextMock);
	
    // Assert
    var stats = fsHelper.statSync('suspicious.log');
 	var fileSizeInBytes = stats['size'];

    expect(fileSizeInBytes > 0).toBe(true);
  });

  it('logFile enabled, make sure we are not logging normal requests', function() {

  	// Arrange
  	var interceptor = expressDefend.protect({ 
		consoleLogging: false, 
		dropSuspiciousRequest: false, 
		logFile: 'suspicious.log',
		maxAttempts: 1
	});

	expressDefend.fileAppender = fsHelper.appendFileSync; // we need to write file synchronously so that we can validate the result

	var request = getNormalRequest();

	// Act
    interceptor(request, responseMock, nextMock);
	
    // Assert
    expect(fileExists('suspicious.log')).toBe(false);
  });

});