const { User } = require("../models");

const findOrCreate = async (email, nickname, login_type, token) => {
  var user = await User.findOne({
    where: { email, login_type },
    attributes: ["id", "nickname", "email"],
  });

  if (!user) {
    user = await User.findOne({
      where: { email },
      attributes: ["id"],
    });
    if (user) throw new Error("This user signed up with another platform");

    user = await User.create({
      email: email,
      nickname: nickname,
      login_type: login_type,
      token,
    });
  }
  delete user.deleted;
  delete user.login_type;
  delete user.token;
  delete user.updatedAt;
  delete user.createdAt;
  return user.toJSON();
};

module.exports = { findOrCreate };
