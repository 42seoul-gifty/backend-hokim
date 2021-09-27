"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Gender",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        value: {
          type: Sequelize.STRING,
          comment: "Gender name",
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
        tableName: "Gender",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Gender");
  },
};
