"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      giver_name: {
        type: Sequelize.STRING,
        comment: "giver Phone Number",
        allowNull: false,
      },
      giver_phone: {
        type: Sequelize.STRING,
        comment: "giver Name",
        allowNull: false,
      },
      merchant_uid: { type: Sequelize.STRING, comment: "merchant_uid" },
      status: {
        type: Sequelize.STRING,
        defaultValue: "결제대기",
        comment: "status",
      },
      imp_uid: { type: Sequelize.STRING, comment: "imp_uid" },
      status: {
        type: Sequelize.STRING,
        defaultValue: "결제대기",
        comment: "status",
      },
      paid_amount: {
        type: Sequelize.INTEGER,
        comment: "paid_amount",
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
