const assert = require("assert");
const axios = require("axios");
const { expect } = require("chai");
const { Product, User, Receiver } = require("../models");

//remove csrf for test
describe("App test!", function () {
  it("POST /product/filter : 주문 필터링", function (done) {
    axios({
      url: "http://localhost:4000/admin/product/filter",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        gender: ["1", "2"],
        age: ["2", "3"],
        price: ["2", "3"],
        category: ["3"],
      },
    })
      .then((res) => {
        console.log(res.status, res.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("POST /shipping/filter : 배송 필터링", function (done) {
    axios({
      url: "http://localhost:4000/admin/shipping/filter",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        end: new Date("2021-09-14"),
      },
    })
      .then((res) => {
        console.log(res.status, res.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("POST /user/filter : 유저 필터링", function (done) {
    axios({
      url: "http://localhost:4000/admin/user/filter?value=order_count&order=desc",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status, res.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("POST /product/register : 새 제품 등록", function (done) {
    axios({
      url: "http://localhost:4000/admin/product/register",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: Math.floor(Math.random() * 500 + 300),
        category: 1,
        name: "name",
        thumbnail: null,
        images: [],
        brand: "2",
        link: null,
        retail_price: 23000,
        fee_rate: 0.2,
        description: "description",
        detail: "detail",
        gender: ["1", "2"],
        age: ["1", "2"],
        price: "1",
      },
    })
      .then((res) => {
        console.log(res.status, res.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("PATCH /product/edit/:product_id : 제품 정보 수정", function (done) {
    setTimeout(async () => {
      var product = await Product.findOne({ order: [["createdAt", "desc"]] });
      product = product.toJSON();
      axios({
        url: `http://localhost:4000/admin/product/edit/${product.id}`,
        method: "patch",
        data: {
          id: "100",
          category: "4",
          name: "1-2인용 미니 돌솥 뚝배기 0",
          thumbnail:
            "https://shop-phinf.pstatic.net/20171103_62/cbs2343_1509704548285NlNfc_JPEG/33011741924072669_-2015252048.jpg?type=m510",
          images: [],
          brand: "더하다하우스",
          link: "https://smartstore.naver.com/thehadahouse/products/2279316766?",
          retail_price: "27000",
          fee_rate: "0",
          description: "(원목받침대 미포함) 미니 돌솥",
          detail:
            "상품정보 제공고시<br>상품정보 제공고시<br>품명 / 모델명 상품상세참조 /",
          gender: ["1", "2"],
          age: ["1", "2", "3"],
          price: "1",
        },
      })
        .then((res) => {
          console.log(res.status, res.data.order);
          expect(res.status).to.equal(200);
          done();
        })
        .catch((e) => {
          expect(res.status).to.equal(200);
          done();
        });
    }, 200);
  });

  it("DELETE /product/:product_id : 제품 삭제", function (done) {
    setTimeout(async () => {
      var product = await Product.findOne({ order: [["createdAt", "desc"]] });
      product = product.toJSON();
      axios({
        url: `http://localhost:4000/admin/product/${product.id}`,
        method: "delete",
      })
        .then((res) => {
          console.log(res.status, res.data.order);
          expect(res.status).to.equal(200);
          done();
        })
        .catch((e) => {
          expect(res.status).to.equal(200);
          done();
        });
    }, 200);
  });

  it("DELETE /user/:user_id : 유저 탈퇴", function (done) {
    setTimeout(async () => {
      var user = await User.findOne({ order: [["createdAt", "desc"]] });
      user = user.toJSON();
      axios({
        url: `http://localhost:4000/admin/user/${user.id}`,
        method: "delete",
      })
        .then((res) => {
          console.log(res.status, res.data.order);
          expect(res.status).to.equal(200);
          done();
        })
        .catch((e) => {
          expect(res.status).to.equal(200);
          done();
        });
    }, 200);
  });

  it("PATCH /receiver/:receiver_id : 받는분 수정", function (done) {
    setTimeout(async () => {
      var receiver = await Receiver.findOne({ order: [["createdAt", "desc"]] });
      receiver = receiver.toJSON();
      axios({
        url: `http://localhost:4000/admin/receiver/${receiver.id}`,
        method: "patch",
        data: {
          name: "receiverpark",
          phone: "010-0000-0001",
          address: "주소",
          detail_address: "주소 상세",
          postcode: "00001",
          gender_id: "3",
          age_id: "4",
          price_id: "3",
          shipment_status: "배송전",
        },
      })
        .then((res) => {
          console.log(res.status, res.data.order);
          expect(res.status).to.equal(200);
          done();
        })
        .catch((e) => {
          expect(res.status).to.equal(200);
          done();
        });
    }, 200);
  });
});
