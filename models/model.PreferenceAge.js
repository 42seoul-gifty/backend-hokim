module.exports = (sequelize, DataTypes) => {
  const PreferenceAge = sequelize.define(
    "PreferenceAge",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: { type: DataTypes.STRING, comment: "age name" },
    },
    {
      tableName: "PreferenceAge",
    }
  );

  PreferenceAge.associate = (models) => {
    PreferenceAge.hasMany(models.Preference, {
      foreignKey: "age_id",
    });
  };

  return PreferenceAge;
};
