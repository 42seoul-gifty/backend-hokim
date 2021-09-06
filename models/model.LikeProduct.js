module.exports = (sequelize, DataTypes) => {
  const LikeProduct = sequelize.define(
    "LikeProduct",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      likes: { type: DataTypes.BOOLEAN },
    },
    {
      tableName: "LikeProduct",
    }
  );

  LikeProduct.associate = (models) => {
    LikeProduct.belongsTo(models.Receiver, { foreignKey: "receiver_id" });
    LikeProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
  };

  return LikeProduct;
};
