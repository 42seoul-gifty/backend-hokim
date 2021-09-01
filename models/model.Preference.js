module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define(
    "Preference",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      gender: { type: DataTypes.STRING, comment: "gender" },
    },
    {
      tableName: "Preference",
    }
  );

  Preference.associate = (models) => {
    Preference.hasMany(models.Receiver, { foreignKey: "preference_id" });
    Preference.hasMany(models.Product, { foreignKey: "preference_id" });
    Preference.hasMany(models.ProductPreference, {
      foreignKey: "preference_id",
    });

    Preference.belongsTo(models.PreferenceAge, {
      foreignKey: "age_id",
    });

    Preference.belongsTo(models.PreferenceGroup, {
      foreignKey: "group_id",
    });

    Preference.belongsTo(models.PreferencePrice, {
      foreignKey: "price_id",
    });
  };

  return Preference;
};
