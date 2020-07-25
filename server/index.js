const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());


const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});