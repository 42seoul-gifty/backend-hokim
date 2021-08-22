module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define(
    "Preference",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      gender: { type: DataTypes.STRING, comment: "gender" },
      min_age: { type: DataTypes.STRING, comment: "min_age" },
      max_age: { type: DataTypes.STRING, comment: "max_age" },
      price: { type: DataTypes.STRING, comment: "price" },
    },
    {
      tableName: "Preference",
    }
  );

  Preference.associate = (models) => {
    Preference.hasMany(models.Receiver, {
      as: "Receiver",
      foreignKey: "id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });

    Preference.hasMany(models.Product, {
      as: "Product",
      foreignKey: "id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  };

  return Preference;
};
