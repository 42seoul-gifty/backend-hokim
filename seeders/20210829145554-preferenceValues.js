"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // age
    await queryInterface.bulkInsert("Age", [
      {
        value: "10",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "20",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "30",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "40",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);

    // price
    await queryInterface.bulkInsert("Price", [
      {
        value: "결제테스트용",
        retail_price: "100",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "1~1만 5천원",
        retail_price: "15000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "2~2만 5천원",
        retail_price: "25000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "3~3만 5천원",
        retail_price: "35000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "4~4만 5천원",
        retail_price: "45000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);

    // group
    await queryInterface.bulkInsert("Feature", [
      {
        value: "school",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "hospital",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "bank",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "office",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Age", null, {});
    await queryInterface.bulkDelete("Price", null, {});
    await queryInterface.bulkDelete("Feature", null, {});
  },
};
