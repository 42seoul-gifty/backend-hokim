const { User } = require("../models");

const findOrCreate = async (email, nickname, login_type, token) => {
  var user = await User.findOne({ where: { email, login_type } });
  if (!user)
    user = await User.create({
      email: email,
      nickname: nickname,
      login_type: login_type,
      token,
    });
  return user.toJSON();
};

module.exports = { findOrCreate };
