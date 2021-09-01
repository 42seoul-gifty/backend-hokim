"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // age
    await queryInterface.bulkInsert("PreferenceAge", [
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
    await queryInterface.bulkInsert("PreferencePrice", [
      {
        value: "10000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "20000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "30000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        value: "40000",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);

    // group
    await queryInterface.bulkInsert("PreferenceGroup", [
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
