module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define(
    "Feature",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: {
        type: DataTypes.STRING,
        comment: "Feature name",
        allowNull: false,
      },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Feature",
    }
  );

  Feature.associate = (models) => {
    Feature.hasMany(models.Receiver, { foreignKey: "feature_id" });
    Feature.belongsToMany(models.Product, {
      through: {
        //교차테이블
        model: "ProductFeature",
        unique: false,
      },
      foreignKey: { name: "feature_id", allowNull: false },
    });
  };

  return Feature;
};
