const User = require("../models/User");

// find user by email
const findUserByEmail = (email) => {
  return User.findOne({ email });
};

// create user
const createUser = (data) => {
  return User.create(data);
};

const findUserById = (id) => {
  return User.findById(id).select("-password -__v");
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
