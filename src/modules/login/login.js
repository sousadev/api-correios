const CryptoJS = require('crypto-js');
const connection = require('../../services/mongoDB/connection');
const jwt = require('jsonwebtoken');

const User = require('../../database/MongoDB/Models/User.Model');
const { generateToken } = require('../../helpers/jwtHelper');

const login = async (req, res) => {
  console.log('chegou na api');
  const data = await req.body;
  console.log('Dados chegando na api' + data.email + ' ' + data.password);
  await User.findOne({ email: data.email })

    .select('+password')
    .exec(async (err, response) => {
      console.log(response);
      const bytes = await CryptoJS.AES.decrypt(
        await response.password,
        process.env.SECRET_PASS_VALIDATION
      );
      const decryptedPass = await bytes.toString(CryptoJS.enc.Utf8);
      if ((await decryptedPass) === data.password) {
        const idUser = await response._id;
        const token = await generateToken(
          idUser,
          data.email,
          await response.userType
        );

        return res.json({
          id: idUser,
          auth: true,
          token: token,
          name: response.name,
          email: response.email,
        });
      } else {
        await res
          .status(500)
          .json({ message: 'Invalid Login. Please contact support!' });
      }
    });
};

module.exports = login;
