const { User } = require("../models");

const findOrCreate = async (email, nickname, login_type, token) => {
  try {
    var user = await User.findOne({ where: { email: email } });
    if (!user)
      user = await User.create({
        email: email,
        nickname: nickname,
        login_type: login_type,
        token,
      });
    return user.toJSON();
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { findOrCreate };
