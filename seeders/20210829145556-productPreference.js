"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ProductAge",
      [
        {
          age_id: "1",
          product_id: "101",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          age_id: "2",
          product_id: "101",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          age_id: "1",
          product_id: "102",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          age_id: "3",
          product_id: "203",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "ProductGender",
      [
        {
          gender: "남",
          product_id: "101",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          gender: "여",
          product_id: "101",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          gender: "여",
          product_id: "102",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "ProductFeature",
      [
        {
          feature_id: "1",
          product_id: "101",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
