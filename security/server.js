import express from "express";
import sqlinjection from "sql-injection";
import secureJSON from "secure-json-parse";
import helmet from "helmet";
import isbot from "isbot";
import rateLimit from "express-rate-limit";

const app = express();

app.use(sqlinjection);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 900000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.listen(3000, () => {
  console.log(`app running on 3000`);
});
