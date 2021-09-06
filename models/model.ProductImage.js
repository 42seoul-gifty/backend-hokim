module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      imageUrl: { type: DataTypes.STRING, comment: "Image Url" },
    },
    {
      tableName: "ProductImage",
    }
  );
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.ProductImage, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
  };
  return ProductImage;
};
