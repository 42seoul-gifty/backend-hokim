module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define(
    "Gender",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: {
        type: DataTypes.STRING,
        comment: "Gender name",
        allowNull: false,
      },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Gender",
    }
  );

  Gender.associate = (models) => {
    Gender.hasMany(models.Receiver, { foreignKey: "gender_id" });

    Gender.belongsToMany(models.Product, {
      through: {
        //교차테이블
        model: "ProductGender",
        unique: false,
      },
      foreignKey: { name: "gender_id", allowNull: false },
    });
  };
  return Gender;
};
