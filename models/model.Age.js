module.exports = (sequelize, DataTypes) => {
  const Age = sequelize.define(
    "Age",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      value: { type: DataTypes.STRING, comment: "age name", allowNull: false },
      updatedBy: { type: DataTypes.STRING, comment: "last Editor" },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      tableName: "Age",
    }
  );

  Age.associate = (models) => {
    Age.hasMany(models.Receiver, { foreignKey: "age_id" });

    Age.belongsToMany(models.Product, {
      through: {
        //교차테이블
        model: "ProductAge",
        unique: false,
      },
      foreignKey: { name: "age_id", allowNull: false },
    });
  };

  return Age;
};
