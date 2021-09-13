module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    "Price",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: {
        type: DataTypes.INTEGER,
        comment: "price name",
        allowNull: false,
      },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Price",
    }
  );

  Price.associate = (models) => {
    Price.hasMany(models.Receiver, { foreignKey: "price_id" });

    Price.hasMany(models.Product, { foreignKey: "price_id" });
  };

  return Price;
};
