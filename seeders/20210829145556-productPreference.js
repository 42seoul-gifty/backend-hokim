"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ProductPreference",
      [
        {
          product_id: "204",
          preference_id: "1",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          product_id: "203",
          preference_id: "4",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          product_id: "102",
          preference_id: "2",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          product_id: "101",
          preference_id: "3",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "214",
          preference_id: "1",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          product_id: "213",
          preference_id: "4",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          product_id: "112",
          preference_id: "2",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          product_id: "111",
          preference_id: "3",
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
