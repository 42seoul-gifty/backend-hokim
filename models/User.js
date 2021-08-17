module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.STRING, primaryKey: true },
    phoneNumber: { type: DataTypes.STRING, comment: "Phone Number" },
    nickname: { type: DataTypes.STRING, comment: "User Name" },
    loginType: { type: DataTypes.STRING, comment: "Login Type" },
    token: { type: DataTypes.STRING, comment: "Login Token" },
  });

  return User;
};
