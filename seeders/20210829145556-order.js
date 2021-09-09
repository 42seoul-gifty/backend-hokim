"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        giver_name: "kim",
        giver_phone: "010-0000-0000",
        payment_amount: "12000",
        imp_uid: "order_20210821233",
        status: "결제완료",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "lee",
        giver_phone: "010-0000-0001",
        payment_amount: "23000",
        imp_uid: "order_202108212344",
        user_id: "2",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "park",
        giver_phone: "010-0000-0002",
        payment_amount: "34000",
        imp_uid: "order_202108216789",
        user_id: "1",
        status: "결제완료",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "choi",
        giver_phone: "010-0000-0003",
        payment_amount: "2100",
        imp_uid: "order_202108210974",
        user_id: "4",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        giver_name: "kim",
        giver_phone: "010-0000-0000",
        payment_amount: "41000",
        imp_uid: "order_20210821238",
        user_id: "3",
        status: "결제완료",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
