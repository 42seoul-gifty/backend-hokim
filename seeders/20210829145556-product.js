"use strict";
const makeRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const detail = [];

    for (var i = 0; i < 10; i++) {
      detail.push({
        id: "10" + i,
        category_id: "4",
        brand_id: "4",
        price_id: makeRandom(1, 5),
        name: "1-2인용 미니 돌솥 뚝배기 " + i,
        description: "(원목받침대 미포함) 미니 돌솥",
        detail:
          "상품정보 제공고시\n상품정보 제공고시\n품명 / 모델명 상품상세참조 / 상품상세참조\n재질 상품상세참조\n구성품 상품상세참조\n크기 상품상세참조\n동일모델의 출시연월 상품상세참조\n제조자(사) 상품상세참조\n제조국 국산\n수입식품안전관리특별법에 따른 수입신고 해당사항 없음\n품질보증기준 상품상세참조\nAS 책임자와 전화번호 상품상세참조 (070-4624-2925)",
        thumbnail:
          "https://shop-phinf.pstatic.net/20171103_62/cbs2343_1509704548285NlNfc_JPEG/33011741924072669_-2015252048.jpg?type=m510",
        retail_price: "27000",
        fee_rate: "",
        link: "https://smartstore.naver.com/thehadahouse/products/2279316766?",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detail.push({
        id: "11" + i,
        category_id: "5",
        brand_id: "3",
        price_id: makeRandom(1, 5),
        name: "어깨깡패 소두곰인형" + i,
        description: "소듕한 애착인형",
        detail:
          "상품번호 5244017334 상품상태 신상품\n제조사 Shenzhen Products Company 브랜드 갓샵(394264)\n모델명 캐릭터상품 원산지 중국\n제조일자 2020.03.23.\n크기(높이) 46cm\n상품정보\n영수증발급\n신용카드전표, 현금영수증발급\nA/S 안내\n070-8831-4371\n상세페이지 참조",
        thumbnail:
          "https://shop-phinf.pstatic.net/20201128_173/1606521897679gqslo_JPEG/100293_1.jpg?type=m510",
        retail_price: "24500",
        fee_rate: "",
        link: "https://smartstore.naver.com/zzimotmi/products/5244017334?",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detail.push({
        id: "21" + i,
        category_id: "4",
        brand_id: "2",
        price_id: makeRandom(1, 5),
        name: "에어러블 플러스 선풍기" + i,
        description: "선풍적인 인기의 선풍기",
        detail:
          "상품정보 제공고시\n상품정보 제공고시\n품명 / 모델명 상품상세참조 / 상품상세참조\n재질 상품상세참조\n구성품 상품상세참조\n크기 상품상세참조\n동일모델의 출시연월 상품상세참조\n제조자(사) 상품상세참조\n제조국 국산\n수입식품안전관리특별법에 따른 수입신고 해당사항 없음\n품질보증기준 상품상세참조\nAS 책임자와 전화번호 상품상세참조 (070-4624-2925)",
        thumbnail:
          "https://shop-phinf.pstatic.net/20171103_62/cbs2343_1509704548285NlNfc_JPEG/33011741924072669_-2015252048.jpg?type=m510",
        retail_price: "33900",
        fee_rate: "",
        link: "https://oneroommaking.com/product/detail.html?product_no=3286&cate_no=294&display_group=1#none",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });

      detail.push({
        id: "22" + i,
        category_id: "3",
        brand_id: "1",
        price_id: makeRandom(1, 5),
        name: "종근당 락토핏 유산균 선물세트" + i,
        description: "편리하게 장건강 챙겨요",
        detail:
          "상품정보 제공고시\n상품정보 제공고시\n건강기능식품에 관한 법률에 따른 표시사항\n상품정보 제공고시\n제품명 상품상세참조\n식품의 유형 상품상세참조\n제조업소 상품상세참조\n소재지 상품상세참조\n제조연월일 상품상세참조\n유통기한 상품상세참조\n포장단위별 내용물의 용량(중량), 수량 상품상세참조\n포장단위별 수량 상품상세참조\n원재료명 및 함량 상품상세참조\n영양정보 상품상세참조\n기능정보 상품상세참조\n섭취량, 섭취방법, 섭취시 주의사항 및 부작용 발생 가능성 상품상세참조\n질병의 예방 및 치료를 위한 의약품이 아니라는 내용의 문구 상품상세참조\n유전자변형식품에 해당하는 경우의 표시 해당사항 없음\n소비자안전을 위한 주의사항 상품상세참조\n수입식품에 해당하는 경우 해당사항 없음\n소비자 상담 관련 전화번호 상품상세참조",
        thumbnail:
          "https://shop-phinf.pstatic.net/20210521_91/1621570635743NAwHI_PNG/22706469548136457_1764454441.png?type=m510",
        retail_price: "34900",
        fee_rate: "",
        link: "https://smartstore.naver.com/thehadahouse/products/2279316766?",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      });
    }

    await queryInterface.bulkInsert(
      "Product",
      detail,

      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Product", null, {});
  },
};
