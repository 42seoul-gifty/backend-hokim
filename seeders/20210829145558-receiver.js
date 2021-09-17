"use strict";
const makeRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const name = ["choi", "park", "lee", "kim"];
    const product_id = ["10", "11", "21", "22"];
    const detail = [];

    for (var i = 0; i < 25; i++) {
      detail.push({
        phone: `010`,
        name: "receiver" + name[makeRandom(0, 4)],
        postcode: "00001",
        address: "101동 101아파트",
        detail_address: "101호",
        product_id: i < 10 ? product_id[makeRandom(0, 4)] + i : null,
        order_id: parseInt(i) + 1,
        age_id: makeRandom(1, 5),
        price_id: makeRandom(1, 5),
        gender_id: makeRandom(1, 4),

        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await queryInterface.bulkInsert("Receiver", detail, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Receiver", null, {});
  },
};
