const Gender = [
  {
    id: "남",
    value: "남",
  },
  {
    id: "여",
    value: "여",
  },
];

const Shipment = [
  {
    id: "1",
    value: "배송전",
  },
  {
    id: "2",
    value: "배송요청",
  },
  {
    id: "3",
    value: "배송중",
  },
  {
    id: "4",
    value: "배송완료",
  },
  {
    id: "5",
    value: "주문 취소",
  },
];

const Payment = [
  {
    id: "1",
    value: "결제대기",
  },
  {
    id: "2",
    value: "결제취소",
  },
  {
    id: "3",
    value: "결제완료",
  },
  {
    id: "4",
    value: "환불대기",
  },
  {
    id: "5",
    value: "환불완료",
  },
  {
    id: "6",
    value: "부분환불",
  },
];

module.exports = { Gender, Shipment, Payment };
