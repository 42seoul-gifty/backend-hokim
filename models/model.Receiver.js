module.exports = (sequelize, DataTypes) => {
  const Receiver = sequelize.define(
    "Receiver",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      phone: { type: DataTypes.STRING, comment: "Phone Number" },
      name: { type: DataTypes.STRING, comment: "Receiver Name" },
      shipment_status: { type: DataTypes.STRING, comment: "Shipment Status" },
    },
    {
      tableName: "Receiver",
    }
  );

  Receiver.associate = (models) => {
    Receiver.belongsTo(models.Preference, {
      as: "Preference",
      foreignKey: "preference_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });

    Receiver.belongsTo(models.Order, {
      as: "Order",
      foreignKey: "order_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });

    Receiver.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "product_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });

    Receiver.belongsTo(models.Address, {
      as: "Address",
      foreignKey: "address_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Receiver;
};
