"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Admin",
      {
        id: { type: Sequelize.STRING, primaryKey: true },
        password: {
          type: Sequelize.STRING,
          comment: "password",
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          comment: "User Name",
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
      },
      {
        tableName: "Admin",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Admin");
  },
};
