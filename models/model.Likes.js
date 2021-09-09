module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      likes: { type: DataTypes.BOOLEAN, defaultValue: 1 },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
    },
    {
      tableName: "Likes",
    }
  );

  Likes.associate = (models) => {
    Likes.belongsTo(models.Receiver, {
      foreignKey: { name: "receiver_id", allowNull: false },
    });
    Likes.belongsTo(models.Product, {
      foreignKey: { name: "product_id", allowNull: false },
    });
  };

  return Likes;
};
