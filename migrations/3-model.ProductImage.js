"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "ProductImage",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        image_url: {
          type: Sequelize.STRING,
          comment: "Image Url",
          allowNull: false,
        },
        product_id: {
          type: Sequelize.STRING,
          references: {
            model: "Product",
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
        tableName: "ProductImage",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductImage");
  },
};
