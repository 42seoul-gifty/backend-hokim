"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Product",
      {
        id: { type: Sequelize.STRING, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false, comment: "name" },
        description: { type: Sequelize.STRING, comment: "description" },
        detail: { type: Sequelize.TEXT("long"), comment: "detail" },
        thumbnail: { type: Sequelize.STRING, comment: "thumbnail" },
        retail_price: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "retail_price",
        },
        fee_rate: { type: Sequelize.STRING, comment: "feeRate" },
        link: { type: Sequelize.STRING, comment: "link" },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Category",
            key: "id",
          },
        },
        brand_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Brand",
            key: "id",
          },
        },
        price_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Price",
            key: "id",
          },
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
        tableName: "Product",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Product");
  },
};
