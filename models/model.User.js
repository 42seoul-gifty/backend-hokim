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
      auth: { type: DataTypes.STRING, comment: "Phone Number" },
      nickname: { type: DataTypes.STRING, comment: "User Name" },
      login_type: { type: DataTypes.STRING, comment: "Login Type" },
      token: { type: DataTypes.STRING, comment: "Login Token" },
    },
    {
      tableName: "User",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: "user_id" });
  };

  return User;
};
