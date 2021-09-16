"use strict";

const makeRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const name = ["choi", "park", "lee", "kim"];
    const id = ["1", "2", "3", "4"];
    const imp_uid = [
      "imp_201816140555",
      "imp_316242049437",
      "imp_485102422417",
      "imp_725008893569",
      "imp_316984206585",
      "imp_565817800618",
      "imp_620684407313",
      "imp_402756475079",
      "imp_745600980526",
      "imp_121534830827",
      "imp_691467307197",
      "imp_085344148419",
      "imp_211219865844",
      "imp_380083710833",
      "imp_347809335841",
      "imp_698582454951",
      "imp_789481510091",
      "imp_692404148373",
      "imp_051609329980",
      "imp_527506208569",
      "imp_225070984989",
      "imp_292094124919",
      "imp_226634666787",
      "imp_700562862773",
      "imp_988473999138",
      "imp_890297167788",
      "imp_504568954336",
      "imp_008722654262",
      "imp_908726540985",
      "imp_819252258206",
      "imp_987642018546",
      "imp_615283318165",
    ];

    const detail = [];

    for (var i = 0; i < 25; i++) {
      detail.push({
        giver_name: name[makeRandom(0, 4)],
        giver_phone: "010-0000-0000",
        paid_amount: makeRandom(1, 5) * 1000,
        merchant_uid: "merchant-" + imp_uid[i],
        imp_uid: imp_uid[i],
        user_id: id[makeRandom(0, 4)],
        status: "결제완료",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          giver_name: name[makeRandom(0, 4)],
          giver_phone: "010-0000-0000",
          paid_amount: 100,
          merchant_uid: "1-2021-09-15T08:19:55.414Z",
          imp_uid: "imp_114995595270",
          user_id: 1,
          status: "결제완료",
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert("Orders", detail, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
