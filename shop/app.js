import Koa from "koa";
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from'cookie-parser' 


const app = Koa();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.get('/', async (req, res, next) => {
  res.send("server up");
});





app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app running on http://localhost:${PORT}`));
