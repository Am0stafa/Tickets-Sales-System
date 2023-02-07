require('dotenv').config();

var blacklist = process.env.BLACKLIST.split(", ");

var getClientIp = function(req) {
    var ipAddress = req.connection.remoteAddress;

    if (!ipAddress) {
      return '';
    }// convert from "::ffff:192.0.0.1"  to "192.0.0.1"
    
    if (ipAddress.substr(0, 7) == "::ffff:") {
      ipAddress = ipAddress.substr(7)
    }
    
    return ipAddress;
};

//Part3, Blocking Client IP, if it is in the blacklist
const isIPBlocked = (req, res, next) => {
    var ipAddress = getClientIp(req);
    if(blacklist.indexOf(ipAddress) === -1){
      next();
    }
    
    else {
      res.send(ipAddress + ' IP is not in whiteList')
    }
};

module.exports = {isIPBlocked};