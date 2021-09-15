module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false, comment: "name" },
      description: { type: DataTypes.STRING, comment: "description" },
      detail: { type: DataTypes.TEXT("long"), comment: "detail" },
      thumbnail: { type: DataTypes.STRING, comment: "thumbnail" },
      retail_price: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "retail_price",
      },
      fee_rate: { type: DataTypes.STRING, comment: "feeRate" },
      link: { type: DataTypes.STRING, comment: "link" },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Product",
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, {
      foreignKey: { name: "product_id", allowNull: false },
    });
    Product.hasMany(models.Receiver, { foreignKey: "product_id" });
    Product.hasMany(models.Likes, {
      foreignKey: { name: "product_id", allowNull: false },
    });
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
    Product.belongsTo(models.Brand, {
      foreignKey: "brand_id",
    });

    Product.belongsTo(models.Price, {
      foreignKey: "price_id",
    });

    Product.belongsToMany(models.Gender, {
      through: {
        //교차테이블
        model: "ProductGender",
        unique: false,
      },
      foreignKey: { name: "product_id", allowNull: false },
    });

    Product.belongsToMany(models.Age, {
      through: {
        //교차테이블
        model: "ProductAge",
        unique: false,
      },
      foreignKey: { name: "product_id", allowNull: false },
    });

    Product.belongsToMany(models.Feature, {
      through: {
        //교차테이블
        model: "ProductFeature",
        unique: false,
      },
      foreignKey: { name: "product_id", allowNull: false },
    });
  };

  return Product;
};
