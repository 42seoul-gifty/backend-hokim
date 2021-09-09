module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: {
        type: DataTypes.STRING,
        comment: "Brand name",
        allowNull: false,
      },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Brand",
    }
  );

  Brand.associate = (models) => {
    Brand.hasMany(models.Product, {
      foreignKey: "brand_id",
    });
  };

  return Brand;
};
