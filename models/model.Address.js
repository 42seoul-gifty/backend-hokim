module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      postcode: { type: DataTypes.STRING, comment: "postcode" },
      address: { type: DataTypes.STRING, comment: "address" },
      detail: { type: DataTypes.STRING, comment: "detail" },
    },
    {
      tableName: "Address",
    }
  );

  Address.associate = (models) => {
    Address.hasOne(models.Receiver, {
      as: "Receiver",
      foreignKey: "receiver_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Address;
};
