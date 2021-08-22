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
      foreignKey: "receiver_id",
      targetKey: "id",
    });

    Receiver.belongsTo(models.Order, {
      as: "Order",
      foreignKey: "receiver_id",
      targetKey: "id",
    });

    Receiver.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "receiver_id",
      targetKey: "id",
    });

    Receiver.belongsTo(models.Address, {
      as: "Address",
      foreignKey: "receiver_id",
      targetKey: "id",
    });
  };

  return Receiver;
};
