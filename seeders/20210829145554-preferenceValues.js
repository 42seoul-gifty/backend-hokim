"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Gender", [
      {
        value: "남",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "여",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "모두",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);

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
        value: "100",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "15000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "25000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "35000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "45000",
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
