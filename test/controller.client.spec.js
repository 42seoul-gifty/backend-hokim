const axios = require("axios");
const { expect } = require("chai");
const { generateToken } = require("../middleware/jwtAuth");
const { Orders, User } = require("../models");
require("dotenv").config();

describe("App test!", function () {
  var access_token;
  var refresh_token;

  it("딜레이", function (done) {
    setTimeout(async () => {
      const user = await User.findOne({ where: { id: 1 } });
      const result = await generateToken(user);
      access_token = "bearer " + result.access_token;
      console.log(access_token);
      done();
    }, 1500);
  });

  it("GET users/1 : 유저 디테일 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/users/1",
      method: "get",
      headers: {
        Authorization: access_token,
      },
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("GET products : 카테고리에 맞는 제품 검색", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/products?gender=1&price=2&age=2",
      method: "get",
      headers: {
        Authorization: access_token,
      },
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("GET products/:id : 제품 디테일 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/products/101",
      method: "get",
      headers: {
        Authorization: access_token,
      },
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("GET ages : 나이 카테고리 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/ages/",
      method: "get",
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("GET prices : 가격 카테고리 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/prices",
      method: "get",
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("GET genders : 성별 카테고리 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/genders",
      method: "get",
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  if (process.env.ENV != "test")
    it("POST /payment/validation : 결제 검증", function (done) {
      axios({
        url: process.env.SITE_DOMAIN + "/payment/validation",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        data: {
          imp_uid: "imp_114995595270",
          merchant_uid: "1-2021-09-15T08:19:55.414Z",
        },
      })
        .then((res) => {
          console.log(res.status, res.data);
          expect(res.status).to.equal(200);
          done();
        })
        .catch((e) => {
          console.log(e);
          expect(res.status).to.equal(200);
          done();
        });
    });

  it("GET /users/:id/orders/:id : 주문 디테일 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/users/1/orders/1",
      method: "get",
      headers: {
        Authorization: access_token,
      },
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("GET /users/:id/orders : 주문 리스트 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/users/1/orders",
      method: "get",
      headers: {
        Authorization: access_token,
      },
    })
      .then((res) => {
        console.log(res.status, res.data.order);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("POST /users/:id/orders : 주문 생성", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + "/users/1/orders",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      data: {
        giver_name: "giver_kim",
        giver_phone: "010",
        receiver_name: "receiver_lee",
        receiver_phone: "020",
        gender: "1",
        age: "2",
        price: "3",
      },
    })
      .then((res) => {
        console.log(res.status, res.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("DELETE /users/:id/orders/:id : 주문 삭제", function (done) {
    Orders.findOne({ order: [["createdAt", "desc"]] }).then((order) => {
      order = order.toJSON();
      axios({
        url:
          process.env.SITE_DOMAIN +
          `/users/${order.user_id}/orders/${order.id}`,
        method: "delete",
        headers: {
          Authorization: access_token,
        },
      })
        .then((res) => {
          console.log(res.status, res.data.order);
          expect(res.status).to.equal(200);
          done();
        })
        .catch((e) => {
          console.log(e);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  it("GET /receiver/:id : 받는분 디테일 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + `/receiver/1`,
      method: "get",
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("PATCH /receiver/:id : 받는분 정보 수정", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + `/receiver/1`,
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        product_id: "109",
        post_code: "우편번호",
        address: "주소",
        address_detail: "주소 상세",
        likes: [109, 112],
        dislikes: [213, 224],
      },
    })
      .then((res) => {
        console.log(res.status, res.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("GET /receiver/:id/choice : 받는분 선물 조회", function (done) {
    axios({
      url: process.env.SITE_DOMAIN + `/receiver/1/choice`,
      method: "get",
    })
      .then((res) => {
        console.log(res.status, res.data.data);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        console.log(e);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
