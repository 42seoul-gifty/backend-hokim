"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "ProductAge",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        product_id: {
          type: Sequelize.STRING,
          references: {
            model: "Product",
            key: "id",
          },
        },
        age_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Age",
            key: "id",
          },
        },
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
        tableName: "ProductAge",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductAge");
  },
};
