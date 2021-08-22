module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      category: { type: DataTypes.STRING, comment: "category" },
      brand: { type: DataTypes.STRING, comment: "brand" },
      name: { type: DataTypes.STRING, comment: "name" },
      title: { type: DataTypes.STRING, comment: "title" },
      description: { type: DataTypes.STRING, comment: "description" },
      detail: { type: DataTypes.STRING, comment: "detail" },
      thumbnail: { type: DataTypes.STRING, comment: "thumbnail" },
      price: { type: DataTypes.STRING, comment: "price" },
      name: { type: DataTypes.STRING, comment: "name" },
    },
    {
      tableName: "Product",
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Preference, {
      as: "Preference",
      foreignKey: "product_id",
      targetKey: "id",
    });

    Product.hasMany(models.ProductImage, {
      as: "ProductImage",
      foreignKey: "image_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.Receiver, {
      as: "Receiver",
      foreignKey: "receiver_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
