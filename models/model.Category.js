module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: { type: DataTypes.STRING, comment: "Category name" },
    },
    {
      tableName: "Category",
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
    });
  };

  return Category;
};
