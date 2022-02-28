require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const app = express();
const routes = require('./routes');
const axios = require('axios');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3005, console.log('APP says: Server started!'));
