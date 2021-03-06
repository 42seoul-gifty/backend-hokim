module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    giver_name: {
      type: DataTypes.STRING,
      comment: "giver Phone Number",
      allowNull: false,
    },
    giver_phone: {
      type: DataTypes.STRING,
      comment: "giver Name",
      allowNull: false,
    },
    merchant_uid: { type: DataTypes.STRING, comment: "merchant_uid" },
    status: {
      type: DataTypes.STRING,
      defaultValue: "결제대기",
      comment: "status",
    },
    imp_uid: { type: DataTypes.STRING, comment: "imp_uid" },
    status: {
      type: DataTypes.STRING,
      defaultValue: "결제대기",
      comment: "status",
    },
    paid_amount: {
      type: DataTypes.INTEGER,
      comment: "paid_amount",
      allowNull: false,
    },
    updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.User, { foreignKey: "user_id" });
    Orders.hasMany(models.Receiver, { foreignKey: "order_id" });
  };
  return Orders;
};
