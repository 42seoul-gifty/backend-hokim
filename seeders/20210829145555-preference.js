"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Preference", [
      {
        gender: "0",
        age_id: "1",
        price_id: "2",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        gender: "0",
        age_id: "2",
        group_id: "1",
        price_id: "1",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        gender: "0",
        age_id: "3",
        price_id: "1",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        gender: "0",
        age_id: "4",
        group_id: "3",
        price_id: "4",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
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
