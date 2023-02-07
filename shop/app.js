import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import shopRouter from "./routes/shopRouter.js"
import rateLimit from 'express-rate-limit'
import isbot from 'isbot'


const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 58, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(limiter)

// app.use((req, res, next) => {
//   console.log(isbot(req.get('user-agent')))
//   if (isbot(req.get('user-agent'))) {
//     res.status(403).send("bot detected");
//   } else {
//     next();
//   }
// })
app.get("/", (req, res) => {
    res.send("beeb-beeb-boop");
});

app.use("/api/shop", shopRouter);



app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message
  });
});

const PORT = 8082;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
export default app;
