import sqlinjection from "sql-injection";
import secureJSON from "secure-json-parse";
import helmet from "helmet";
import isbot from "is-bot";
import rateLimit from "express-rate-limit";
import express from "express";
import blacklist from "express-blacklist";
import expressDefend from "express-defend";
import cors from "cors";
import { verify } from "hcaptcha";

const app = express();
app.use(cors());
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

const isBot = (req, res, next) => {
    if (isbot(req.headers['user-agent'])) {
        res.status(403).send('Bot Detected');
    } else {
        next();
    }
};
app.use(isBot);


app.post("/signup-with-hcaptcha", async (req, res, next) => {
    if (!req.body.token) {
        return res.status(400).json({ error: "Token is missing" });
    }

    try {
        let { success } = await verify(
            "0x5D1f8147E155023662b712749EFe47Fac334e03F",
            req.body.token
        );
        if (success) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ error: "Invalid Captcha" });
        }
    } catch (e) {
        return res.status(400).json({ error: "Captcha Error. Try again." });
    }
});




app.listen(3001, () => {
  console.log(`app running on 3001`);
});
