"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("User", [
      {
        email: "kim@gmail.com",
        phone: "010-0000-0000",
        nickname: "kim",
        login_type: "kakao",
        token: "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        email: "lee@gmail.com",
        phone: "010-1234-1234",
        nickname: "lee",
        login_type: "naver",
        token: "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        email: "park@gmail.com",
        phone: "010-2020-2020",
        nickname: "park",
        login_type: "kakao",
        token: "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        email: "choi@gmail.com",
        phone: "010-3210-3210",
        nickname: "choi",
        login_type: "kakao",
        token: "",
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
