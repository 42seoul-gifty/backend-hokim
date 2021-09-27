"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Feature",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        value: {
          type: Sequelize.STRING,
          comment: "Feature name",
          allowNull: false,
        },
        deleted: { type: Sequelize.BOOLEAN, defaultValue: 0 },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedBy: { type: Sequelize.STRING, comment: "last Editor" },
      },
      {
        tableName: "Feature",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Feature");
  },
};
