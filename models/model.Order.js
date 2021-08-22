module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      giver_name: { type: DataTypes.STRING, comment: "giver Phone Number" },
      giver_phone: { type: DataTypes.STRING, comment: "giver Name" },
      merchant_uid: { type: DataTypes.STRING, comment: "merchant_uid" },
      imp_uid: { type: DataTypes.STRING, comment: "imp_uid" },
    },
    {
      tableName: "Order",
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });

    Order.hasMany(models.Receiver, {
      as: "Receiver",
      foreignKey: "id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };
  return Order;
};
