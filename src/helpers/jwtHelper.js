const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(401).json({ message: 'Expected token!' });
  }

  const authHeader = await req.headers['authorization'];

  const receivedToken = await authHeader.split(' ');
  const token = receivedToken[1];

  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token received.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
    if (err) {
      return await res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.idUser = await decoded.idUser;
    req.username = await decoded.username;
    req.userType = await decoded.userType;
    req.idNumber = await decoded.idNumber;
    await next();
  });
};

const generateToken = async (idUser, username, userType, idNumber) => {
  return jwt.sign(
    { idUser, username, userType, idNumber },
    process.env.SECRET_KEY,
    {
      expiresIn: 86400, // expires in 24hs
    }
  );
};

module.exports = { validateUser, generateToken };
