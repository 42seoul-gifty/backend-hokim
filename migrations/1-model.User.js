"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "User",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        email: {
          type: Sequelize.STRING,
          comment: "email",
          unique: true,
          allowNull: false,
        },
        phone: { type: Sequelize.STRING, comment: "Phone Number" },
        nickname: {
          type: Sequelize.STRING,
          comment: "User Name",
          allowNull: false,
        },
        login_type: {
          type: Sequelize.STRING,
          comment: "Login Type",
          allowNull: false,
        },
        token: { type: Sequelize.STRING, comment: "Login Token" },
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
        tableName: "User",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User");
  },
};
