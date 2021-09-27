"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Receiver",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        phone: {
          type: Sequelize.STRING,
          comment: "Phone Number",
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          comment: "Receiver Name",
          allowNull: false,
        },
        postcode: {
          type: Sequelize.STRING,
          comment: "postcode",
        },
        address: { type: Sequelize.STRING, comment: "address" },
        detail_address: { type: Sequelize.STRING, comment: "detail Address" },
        shipment_status: {
          type: Sequelize.STRING,
          comment: "Shipment Status",
          defaultValue: "배송전",
        },
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
        price_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Price",
            key: "id",
          },
        },
        gender_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Gender",
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
        order_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Orders",
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
        updatedBy: { type: Sequelize.STRING },
      },
      {
        tableName: "Receiver",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Receiver");
  },
};
