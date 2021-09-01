module.exports = (sequelize, DataTypes) => {
  const Receiver = sequelize.define(
    "Receiver",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      phone: { type: DataTypes.STRING, comment: "Phone Number" },
      name: { type: DataTypes.STRING, comment: "Receiver Name" },
      postcode: { type: DataTypes.STRING, comment: "postcode" },
      address: { type: DataTypes.STRING, comment: "address" },
      detailAddress: { type: DataTypes.STRING, comment: "detail Address" },
      shipmentStatus: { type: DataTypes.STRING, comment: "Shipment Status" },
    },
    {
      tableName: "Receiver",
    }
  );

  Receiver.associate = (models) => {
    Receiver.hasMany(models.Like, { foreignKey: "receiver_id" });
    Receiver.belongsTo(models.Preference, { foreignKey: "preference_id" });
    Receiver.belongsTo(models.Order, { foreignKey: "order_id" });
    Receiver.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return Receiver;
};
