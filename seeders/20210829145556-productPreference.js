"use strict";
const makeRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const detailAge = [];
    const detailGender = [];

    for (var i = 0; i < 10; i++) {
      detailAge.push({
        age_id: makeRandom(1, 5),
        product_id: "10" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
      detailAge.push({
        age_id: makeRandom(1, 5),
        product_id: "11" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
      detailAge.push({
        age_id: makeRandom(1, 5),
        product_id: "21" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
      detailAge.push({
        age_id: makeRandom(1, 5),
        product_id: "22" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detailGender.push({
        gender_id: makeRandom(1, 4),
        product_id: "10" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
      detailGender.push({
        gender_id: makeRandom(1, 4),
        product_id: "11" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
      detailGender.push({
        gender_id: makeRandom(1, 4),
        product_id: "21" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
      detailGender.push({
        gender_id: makeRandom(1, 4),
        product_id: "22" + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await queryInterface.bulkInsert("ProductAge", detailAge, {});
    await queryInterface.bulkInsert("ProductGender", detailGender, {});

    await queryInterface.bulkInsert(
      "ProductFeature",
      [
        {
          feature_id: "1",
          product_id: "101",
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
