module.exports = (sequelize, DataTypes) => {
  const ProductPreference = sequelize.define(
    "ProductPreference",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    },
    {
      tableName: "ProductPreference",
    }
  );

  ProductPreference.associate = (models) => {
    ProductPreference.belongsTo(models.Preference, {
      foreignKey: "preference_id",
    });
    ProductPreference.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return ProductPreference;
};
