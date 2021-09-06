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
          detailAddress: "101호",
          shipmentStatus: "",
          product_id: "101",
          order_id: "4",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          phone: "010-0000-0002",
          name: "receiverLee",
          postcode: "00002",
          address: "102동 102아파트",
          detailAddress: "102호",
          shipmentStatus: "",
          order_id: "2",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          phone: "010-0000-0003",
          name: "receiverPark",
          postcode: "00003",
          address: "103동 103아파트",
          detailAddress: "103호",
          shipmentStatus: "",
          order_id: "1",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },

        {
          phone: "010-0000-0004",
          name: "receiverChoi",
          postcode: "00004",
          address: "104동 104아파트",
          detailAddress: "104호",
          shipmentStatus: "",
          order_id: "3",
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
