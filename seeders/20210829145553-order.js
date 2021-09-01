"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Order", [
      {
        giver_name: "kim",
        giver_phone: "010-0000-0000",
        price: "12000",
        imp_uid: "order_20210821233",
        user_id: "1",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "lee",
        giver_phone: "010-0000-0001",
        price: "23000",
        imp_uid: "order_202108212344",
        user_id: "2",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "park",
        giver_phone: "010-0000-0002",
        price: "34000",
        imp_uid: "order_202108216789",
        user_id: "3",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "choi",
        giver_phone: "010-0000-0003",
        price: "2100",
        imp_uid: "order_202108210974",
        user_id: "4",
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
