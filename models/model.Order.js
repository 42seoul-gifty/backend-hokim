module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    giver_name: { type: DataTypes.STRING, comment: "giver Phone Number" },
    giver_phone: { type: DataTypes.STRING, comment: "giver Name" },
    price: { type: DataTypes.INTEGER, comment: "price" },
    imp_uid: { type: DataTypes.STRING, comment: "imp_uid" },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "user_id" });
    Order.hasMany(models.Receiver, { foreignKey: "order_id" });
  };
  return Order;
};
