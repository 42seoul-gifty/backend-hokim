"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Likes",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        likes: { type: Sequelize.BOOLEAN, defaultValue: 1 },
        receiver_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Receiver",
            key: "id",
          },
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
        tableName: "Likes",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Likes");
  },
};
