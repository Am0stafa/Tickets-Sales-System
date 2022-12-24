var chalk = require('chalk');

module.exports = {

	// Private members
	blacklist: [],
	fs: require('fs'),
	blacklistFilename: null,
	endOfLine: require('os').EOL,

	blockRequests: function(blacklistFilename) {

		this.blacklistFilename = blacklistFilename;
		this.read();

		this.logEvent('info', 'There are ' + this.blacklist.length + ' address(es) on the blacklist');

		var self = this;

		var interceptor = function(request, response, next) {

			var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
			
			if (self.isInBlacklist(ip)) {
				self.logEvent('warn', 'Rejecting request from ' + ip + ', path and query was ' + request.originalUrl);
				response.status(403).send();
			}
			else {
				next();
			}
		}

		return interceptor;
	},

	addAddress: function(ipAddress) {

		if (this.isInBlacklist(ipAddress)) {
			return false;
		}

		this.blacklist.push(ipAddress);
		this.persist();

		this.logEvent('warn', 'IP Address added to blacklist: ' + ipAddress);
		return true;
	},

	isInBlacklist: function(ipAddress) {
		for (var i=0; i!=this.blacklist.length; i++) {
			if (this.blacklist[i] == ipAddress) {
				return true;
			}
		}

		return false;
	},

	read: function() {
		try {
			this.blacklist = this.fs.readFileSync(this.blacklistFilename)
				.toString()
				.split(this.endOfLine)
				.filter(function(row) {
					return row != ''
				});
		}
		catch (error) {
			if (error.code == 'ENOENT') {
				this.blacklist = [];
				this.persist();
				this.logEvent('info', 'Blacklist file created: ' + this.blacklistFilename);
			}
		}
	},

	persist: function() {
		var self = this;
		var file = this.fs.createWriteStream(this.blacklistFilename);

		file.on('error', function(err) { 
			this.logEvent('warn', 'Unable to persist blacklist file: ' + err);
		});
		
		this.blacklist.forEach(function(ipAddress) { 
			file.write(ipAddress + self.endOfLine); 
		});

		file.end();
	},

	// type: info|warn
	logEvent: function(type, message) {
		var msg = type == 'info' ? chalk.green('[express-blacklist] ') : chalk.red('[express-blacklist] ');
		msg += message;

		console.log(msg);
	}
}