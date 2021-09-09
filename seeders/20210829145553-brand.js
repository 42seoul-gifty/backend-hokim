"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Brand", [
      {
        value: "종근당",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "에어러블",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "찌못미샵",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "더하다하우스",
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
    await queryInterface.bulkDelete("Brand", null, {});
  },
};
