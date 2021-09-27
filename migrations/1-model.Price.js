"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Price",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        value: {
          type: Sequelize.INTEGER,
          comment: "price name",
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
        tableName: "Price",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Price");
  },
};
