module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      image_url: { type: DataTypes.STRING, comment: "Image Url" },
    },
    {
      tableName: "ProductImage",
    }
  );
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.ProductImage, {
      as: "Product",
      foreignKey: "product_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };
  return ProductImage;
};
