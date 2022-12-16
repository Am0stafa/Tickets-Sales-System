import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use("/api/users", userRouter);

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

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));