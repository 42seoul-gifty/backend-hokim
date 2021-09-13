"use strict";

const makeRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const name = ["choi", "park", "lee", "kim"];
    const id = ["1", "2", "3", "4"];
    const detail = [];

    for (var i = 0; i < 25; i++) {
      detail.push({
        giver_name: name[makeRandom(0, 4)],
        giver_phone: "010-0000-0000",
        payment_amount: makeRandom(1, 5) * 1000,
        imp_uid: "order_20210821233",
        user_id: id[makeRandom(0, 4)],
        status: "결제완료",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await queryInterface.bulkInsert("Orders", detail, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
