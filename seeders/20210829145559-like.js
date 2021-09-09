"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          likes: true,
          receiver_id: 1,
          product_id: 101,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          likes: true,
          receiver_id: 1,
          product_id: 203,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          likes: false,
          receiver_id: 1,
          product_id: 102,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          likes: true,
          receiver_id: 2,
          product_id: 204,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          likes: false,
          receiver_id: 2,
          product_id: 101,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          likes: true,
          receiver_id: 2,
          product_id: 102,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
