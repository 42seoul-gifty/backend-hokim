module.exports = (sequelize, DataTypes) => {
  const PreferenceGroup = sequelize.define(
    "PreferenceGroup",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: { type: DataTypes.STRING, comment: "group name" },
    },
    {
      tableName: "PreferenceGroup",
    }
  );

  PreferenceGroup.associate = (models) => {
    PreferenceGroup.hasMany(models.Preference, {
      foreignKey: "group_id",
    });
  };

  return PreferenceGroup;
};
