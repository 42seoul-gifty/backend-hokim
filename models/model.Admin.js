const cryptoHash = require("../module/cryptoHash");
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      password: {
        type: DataTypes.STRING,
        comment: "password",
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        comment: "User Name",
        allowNull: false,
      },
      token: { type: DataTypes.STRING, comment: "Login Token" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Admin",
    }
  );

  Admin.beforeCreate((admin, _) => {
    admin.password = cryptoHash(admin.password);
  });

  return Admin;
};
