import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import shopRouter from "./routes/shopRouter.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use("/api", shopRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
