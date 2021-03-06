module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      image_url: {
        type: DataTypes.STRING,
        comment: "Image Url",
        allowNull: false,
      },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
    },
    {
      tableName: "ProductImage",
    }
  );
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.ProductImage, {
      foreignKey: { name: "product_id", allowNull: false },
    });
  };
  return ProductImage;
};
