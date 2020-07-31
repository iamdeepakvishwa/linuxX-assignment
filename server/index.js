const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const app = express();

const route = require('./api/auth-api/auth-route-candidate');

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use('/auth',route);


const notFound =(req,res,next)=> {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
  }
  
  const errorHandler=(err, req, res, next) =>{
    res.status(res.statusCode || 500);
    res.json({
      message: err.message,
      stack: err.stack
    });
  }
  
  app.use(notFound);
  app.use(errorHandler);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});