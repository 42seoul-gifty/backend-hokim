"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Receiver",
      [
        {
          phone: "010-0000-0001",
          name: "receiverKim",
          postcode: "00001",
          address: "101동 101아파트",
          detail_address: "101호",
          product_id: "101",
          order_id: "4",

          age_id: "1",
          price_id: "2",
          gender: "남",

          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          phone: "010-0000-0002",
          name: "receiverLee",
          postcode: "00002",
          address: "102동 102아파트",
          detail_address: "102호",
          order_id: "2",

          age_id: "4",
          price_id: "1",
          gender: "남",

          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          phone: "010-0000-0003",
          name: "receiverPark",
          postcode: "00003",
          address: "103동 103아파트",
          detail_address: "103호",
          order_id: "1",

          age_id: "2",
          price_id: "4",
          gender: "여",

          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          phone: "010-0000-0004",
          name: "receiverChoi",
          postcode: "00004",
          address: "104동 104아파트",
          detail_address: "104호",
          shipment_status: "배송요청",
          order_id: "3",

          age_id: "3",
          price_id: "1",
          gender: "여",

          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Receiver", null, {});
  },
};
