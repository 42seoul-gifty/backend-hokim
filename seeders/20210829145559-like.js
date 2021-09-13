"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const makeRandom = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    const detail = [];

    for (var i = 0; i < 10; i++) {
      detail.push({
        product_id: "10" + i,
        likes: makeRandom(0, 10) > 5 ? true : false,
        receiver_id: makeRandom(1, 5),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detail.push({
        product_id: "11" + i,
        likes: makeRandom(0, 10) > 5 ? true : false,
        receiver_id: makeRandom(1, 5),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detail.push({
        product_id: "21" + i,
        likes: makeRandom(0, 10) > 5 ? true : false,
        receiver_id: makeRandom(1, 5),

        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detail.push({
        product_id: "22" + i,
        likes: makeRandom(0, 10) > 5 ? true : false,
        receiver_id: makeRandom(1, 5),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await queryInterface.bulkInsert("Likes", detail, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
