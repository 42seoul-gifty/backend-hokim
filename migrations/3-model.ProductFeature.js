"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "ProductFeature",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        product_id: {
          type: Sequelize.STRING,
          references: {
            model: "Product",
            key: "id",
          },
        },
        feature_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Feature",
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
        tableName: "ProductFeature",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductFeature");
  },
};
