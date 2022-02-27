require('dotenv').config();

const express = require('express');
const routes = express.Router();

//Database MongoDB
// const connection = require('./services/mongoDB/connection'); // >> Habilite para usar MongoDB

//JWT Auth
const jwt = require('jsonwebtoken');
const { validateUser, generateToken } = require('./helpers/jwtHelper');
const login = require('./modules/login/login');
const signup = require('./modules/login/signup');

// Indicate version

routes.get(`/`, validateUser, async (req, res) => {
  await res.status(200).json({ message: 'started!' });
});

routes.post(`/signup`, signup);
routes.post(`/login`, login);

module.exports = routes;
