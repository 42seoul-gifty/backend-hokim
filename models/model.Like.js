module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      like: { type: DataTypes.BOOLEAN },
    },
    {
      tableName: "Like",
    }
  );

  Like.associate = (models) => {
    Like.belongsTo(models.Receiver, { foreignKey: "receiver_id" });
    Like.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return Like;
};
