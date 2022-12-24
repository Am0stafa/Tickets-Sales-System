import sqlinjection from "sql-injection";
import secureJSON from "secure-json-parse";
import helmet from "helmet";
import isbot from "isbot";
import rateLimit from "express-rate-limit";
import express from "express";
import blacklist from "express-blacklist";
import expressDefend from "express-defend";

const app = express();

const limiter = rateLimit({
  windowMs: 900000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(blacklist.blockRequests('blacklist.txt'));

app.use(expressDefend.protect({
  maxAttempts: 5,
  dropSuspiciousRequest: true,
  logFile: 'suspicious.log',
  onMaxAttemptsReached: function (ipAddress, url) {
    blacklist.addAddress(ipAddress);
  }
}));

app.use(sqlinjection);
app.use(helmet());

// Apply the rate limiting middleware to all requests
app.use(limiter);
//192.168.56.1


app.get("/botTest", (req, res) => {
  isbot(req.get("user-agent"));
  console.log(req.get("user-agent"));
  res.send("testing bot package.");
});

app.listen(3000, () => {
  console.log(`app running on 3000`);
});
