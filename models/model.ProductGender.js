module.exports = (sequelize, DataTypes) => {
  const ProductGender = sequelize.define(
    "ProductGender",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      gender: {
        type: DataTypes.STRING,
        comment: "Gender name",
        allowNull: false,
      },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
    },
    {
      tableName: "ProductGender",
    }
  );

  ProductGender.associate = (models) => {
    ProductGender.belongsTo(models.Product, {
      foreignKey: { name: "product_id", allowNull: false },
    });
  };

  return ProductGender;
};
