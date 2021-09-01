module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      category: { type: DataTypes.STRING, comment: "category" },
      brand: { type: DataTypes.STRING, comment: "brand" },
      name: { type: DataTypes.STRING, comment: "name" },
      description: { type: DataTypes.STRING, comment: "description" },
      detail: { type: DataTypes.TEXT("long"), comment: "detail" },
      thumbnail: { type: DataTypes.STRING, comment: "thumbnail" },
      price: { type: DataTypes.STRING, comment: "price" },
      fee_rate: { type: DataTypes.STRING, comment: "feeRate" },
      link: { type: DataTypes.STRING, comment: "link" },
    },
    {
      tableName: "Product",
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Preference, { foreignKey: "preference_id" });
    Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
    Product.hasMany(models.Receiver, { foreignKey: "product_id" });
    Product.hasMany(models.LikeProduct, { foreignKey: "product_id" });
    Product.hasMany(models.ProductPreference, { foreignKey: "product_id" });
  };

  return Product;
};
