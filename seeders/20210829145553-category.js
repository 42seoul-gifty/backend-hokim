"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Category", [
      {
        value: "화장품",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "식품",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "건강",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "리빙",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "패션잡화",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "디지털",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Category", null, {});
  },
};
