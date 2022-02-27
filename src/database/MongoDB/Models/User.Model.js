const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    select: false,
    required: true,
  },

  userType: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
