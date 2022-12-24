var chalk = require('chalk');

module.exports = {

	// Config settings
	dropSuspiciousRequest: false,    // Drop suspicious request if maxAttempts reached
	logFile: null,                   // If specified, we store logs in this file
	onMaxAttemptsReached: null,      // A callback(ipAddress, url) that is triggered once an attacker from an IP has reached the maximum number of attempts
	maxAttempts: 5,                  // Number of maximum attempts from attacker until we put him/her on blacklist: 1 means that we block the IP immediately
	consoleLogging: true,            // Console logging

	// Private members
	fs: null,                        // Log file handle
	endOfLine: require('os').EOL,    // Platform specific EOL, used when logging
	blacklistCandidates: [],         // Candidates to be put on blacklist: IP => AttemptCount association - once we reach maxAttempts for an IP, we block it
	fileAppender: null,              // Function to be used to append file (mockable)
	suspiciousUrlFragments: [
		{ 
			category: 'Path Traversal', 
			patterns: [ '../', '.%00.', '..%01', '%5C..', '.%2e', '%2e.', '..\\', 
				'/etc/hosts', '/etc/passwd', '/etc/shadow', '/etc/issue', 
				'Windows/System32/cmd.exe', 'Windows\\System32\\cmd.exe', 'c+dir+c:\\', '\\windows\\system32\\drivers\\etc\\hosts', 'config.inc.php' ] 
		}, 
		{ 
			category: 'Reflected XSS', 
			patterns: [ '<script', '\\x3cscript', '%3cscript', 'alert(', 'onclick=', 'onerror=', 'onkeydown=', 'onkeypress=', 'onkeyup=', 'onmouseout=', 'onmouseover=', 
				'onload=', 'document.cookie', '.addeventlistener', 'javascript:', 'jav&#x0D;ascript:', 'java\0script' ] 
		},
		{ 
			category: 'SQL Injection', 
			patterns: ['\' or \'1\'=\'1', 'or \'x\'=\'x\'', 'or 1=1', '" or "1"="1', '" or ""=""', '\' or \'\'=\'\'', 'DROP TABLE', 'INSERT INTO'] 
		}
	],

	protect: function(settings) {

		this.applySettings(settings);

		var self = this;

		var interceptor = function(request, response, next) {

			var url = request.originalUrl;

			if (url == undefined || url == null) {
				next();
				return;
			}

			for (var i=0; i!=self.suspiciousUrlFragments.length; i++) {

				var category = self.suspiciousUrlFragments[i].category;
				var patterns = self.suspiciousUrlFragments[i].patterns;

				for (var j=0; j!=patterns.length; j++) {
					if (url.toLowerCase().indexOf(patterns[j].toLowerCase()) > 0 
						|| decodeURI(url.toLowerCase()).indexOf(patterns[j].toLowerCase()) > 0 ) {

						self.handleSuspiciousRequest(request, response, next, category, patterns[j]);

						return;
					}
				}
			}

			next();
		}

		return interceptor;
	},

	setDefaults: function() {
		this.dropSuspiciousRequest = false;
		this.logFile = null;
		this.onMaxAttemptsReached = null;
		this.maxAttempts = 5;
		this.consoleLogging = true;
	},

	applySettings: function(settings) {

		if (settings.dropSuspiciousRequest != undefined) {
			this.dropSuspiciousRequest = settings.dropSuspiciousRequest;
		}

		if (settings.consoleLogging != undefined) {
			this.consoleLogging = settings.consoleLogging;
		}

		if (settings.onMaxAttemptsReached != undefined) {
			this.onMaxAttemptsReached = settings.onMaxAttemptsReached;
		}

		if (settings.maxAttempts != undefined) {
			this.maxAttempts = settings.maxAttempts;
		}

		if (settings.logFile != undefined) {
			this.logFile = settings.logFile;
			this.fs = require('fs');
			this.fileAppender = this.fs.appendFile;
		}
	},

	handleSuspiciousRequest: function(request, response, next, category, blacklistItem) {

		var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
		var message = 'Suspicious Request ' + request.originalUrl + ', fragment is on blacklist ('+category+'): "' + blacklistItem + '"" from ' + this.getHumanReadableAddress(request);

		var thresholdReached = this.hasIpReachedThreshold(ip);

		if (thresholdReached && this.onMaxAttemptsReached != null) {
			message += ', reached threshold (' + this.maxAttempts + ')';
			try {
				this.onMaxAttemptsReached(ip, request.originalUrl);
			}
			catch (error) {
				this.logEvent('warn', 'An error occurred while executing onMaxAttemptsReached callback: ' + error);
			}
		}

		this.logEvent('warn', message);

		if (thresholdReached && this.dropSuspiciousRequest) {
			this.logEvent('warn', 'Dropping request ' + request.originalUrl + ' from ' + this.getHumanReadableAddress(request));
			response.status(403).send('Untrusted Request Detected');
			return;
		}

		next();
	},

	hasIpReachedThreshold: function(ipAddress) {

		for (var i=0; i!=this.blacklistCandidates.length; i++) {
			if (this.blacklistCandidates[i].ipAddress == ipAddress) {
				this.blacklistCandidates[i].attemptCount++;

				if (this.blacklistCandidates[i].attemptCount == this.maxAttempts) {
					return true;
				}

				return false;
			}
		}
		
		this.blacklistCandidates.push({ ipAddress: ipAddress, attemptCount: 1 });
		return (this.maxAttempts == 1);
	},

	getHumanReadableAddress: function(request) {

		if (request.headers['x-forwarded-for']) {
			return request.headers['x-forwarded-for'] + ' (via ' + request.connection.remoteAddress + ')';
		}

		return request.connection.remoteAddress;
	},

	// type: info|warn
	logEvent: function(type, message) {
		var msg = type == 'info' ? chalk.green('[express-defend] ') : chalk.red('[express-defend] ');
		msg += message;

		if (this.logFile != null && this.fs != null) {
			this.fileAppender(this.logFile, message + this.endOfLine);
		}

		if (this.consoleLogging) {
			console.log(msg);
		}
	}
}