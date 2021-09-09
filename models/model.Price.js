module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    "Price",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: {
        type: DataTypes.STRING,
        comment: "price name",
        allowNull: false,
      },
      retail_price: {
        type: DataTypes.INTEGER,
        comment: "retail price",
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
