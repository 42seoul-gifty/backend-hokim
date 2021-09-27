const { convertImageUrl } = require("../lib/lib.Product");

function makeToJson(value) {
  try {
    return value.toJSON();
  } catch (e) {
    return value;
  }
}

const convertReceiverResponse = (receiver) => {
  receiver = makeToJson(receiver);
  if (receiver.Product) convertImageUrl(receiver.Product);
  receiver["product"] = receiver.Product;
  receiver["address"] = {
    address: receiver.address,
    post_code: receiver.postcode,
    address_detail: receiver.detail_address,
  };

  delete receiver.Product;
  delete receiver.postcode;
  delete receiver.detail_address;
  return receiver;
};

module.exports = { convertReceiverResponse };
