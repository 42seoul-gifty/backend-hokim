module.exports = (sequelize, DataTypes) => {
  const Receiver = sequelize.define(
    "Receiver",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      phone: {
        type: DataTypes.STRING,
        comment: "Phone Number",
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        comment: "Receiver Name",
        allowNull: false,
      },
      postcode: {
        type: DataTypes.STRING,
        comment: "postcode",
      },
      address: { type: DataTypes.STRING, comment: "address" },
      detail_address: { type: DataTypes.STRING, comment: "detail Address" },
      shipment_status: {
        type: DataTypes.STRING,
        comment: "Shipment Status",
        defaultValue: "배송전",
      },
      gender: { type: DataTypes.STRING, comment: "Receiver Name" },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
    },
    {
      tableName: "Receiver",
    }
  );

  Receiver.associate = (models) => {
    Receiver.hasMany(models.Likes, {
      foreignKey: { name: "receiver_id", allowNull: false },
    });
    Receiver.belongsTo(models.Orders, { foreignKey: "order_id" });
    Receiver.belongsTo(models.Product, { foreignKey: "product_id" });

    Receiver.belongsTo(models.Age, { foreignKey: "age_id" });
    Receiver.belongsTo(models.Price, { foreignKey: "price_id" });
    Receiver.belongsTo(models.Feature, { foreignKey: "feature_id" });
  };

  return Receiver;
};
