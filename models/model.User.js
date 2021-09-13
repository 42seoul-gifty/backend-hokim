const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: {
        type: DataTypes.STRING,
        comment: "email",
        unique: true,
        allowNull: false,
      },
      phone: { type: DataTypes.STRING, comment: "Phone Number" },
      nickname: {
        type: DataTypes.STRING,
        comment: "User Name",
        allowNull: false,
      },
      login_type: {
        type: DataTypes.STRING,
        comment: "Login Type",
        allowNull: false,
      },
      token: { type: DataTypes.STRING, comment: "Login Token" },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "User",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Orders, { foreignKey: "user_id" });
  };

  return User;
};
