require('dotenv').config();

const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const connection = require('../../services/mongoDB/connection');

const User = require('../../database/MongoDB/Models/User.Model');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const bytes = await CryptoJS.AES.encrypt(
    await req.body.password,
    process.env.SECRET_PASS_VALIDATION
  ).toString();

  if (req.headers.auth === process.env.SECRET_KEY) {
    await User.create({
      password: await bytes,
      userType: req.body.userType,
      name: req.body.name,
      email: req.body.email,
    }).then(async (d) => {
      await prisma.User.create({
        data: {
          name: await d.name,
          email: await d.email,
          password: await d.password,
          userType: await d.userType,
        },
      });
      await res.status(201).json({
        message: 'user created',
        data: {
          id: d._id,
          userType: d.userType,
          name: d.name,
          email: d.email,
        },
      });
    });
    // .catch(async (e) => {
    //   await res.status(409).json({
    //     message: 'already exists in database',
    //     error: e,
    //   });
    // });
  } else {
    await res.send(403).json({ message: 'Unauthorized.' });
  }
};

module.exports = signup;
