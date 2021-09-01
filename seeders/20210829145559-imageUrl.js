"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ProductImage",
      [
        {
          product_id: "204",
          imageUrl:
            "https://shop-phinf.pstatic.net/20171103_12/cbs2343_1509704548397jMEbY_JPEG/33011742035924913_-671836731.jpg?type=m510",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "204",
          imageUrl:
            "https://shop-phinf.pstatic.net/20171103_249/cbs2343_1509704548180NpbQR_JPEG/33011741820463505_1608397254.jpg?type=m510",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "203",
          imageUrl:
            "https://phinf.pstatic.net/checkout.phinf/20210330_230/1617072554698VN1K7_JPEG/review-attachment-9c3e4c9f-4038-49f7-b699-b5256c19872a.jpeg?type=w640",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "203",
          imageUrl:
            "https://phinf.pstatic.net/checkout.phinf/20210102_59/1609591207962d1Ag8_JPEG/review-attachment-a8a68c70-856d-473d-878e-46cd924539f0.jpeg?type=w640",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "101",
          imageUrl:
            "https://shop-phinf.pstatic.net/20210521_264/1621570643642ahTxC_PNG/22706477448027086_357184054.png?type=m510",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "101",
          imageUrl:
            "https://shop-phinf.pstatic.net/20210521_126/1621570643728XfakG_PNG/22706477537221448_2131560272.png?type=m510",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "102",
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20200422/1416400/1416400_1_500.jpg",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
        {
          product_id: "102",
          imageUrl:
            "https://image.msscdn.net/images/prd_img/20200422/1416400/detail_1416400_3_500.jpg",
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
