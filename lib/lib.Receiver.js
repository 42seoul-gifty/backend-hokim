const { Receiver } = require("../models");
const { findOrCreate } = require("./lib.Preference");

const createReciever = async (
  name,
  phone,
  order_id,
  gender_id,
  age_id,
  group_id,
  price_id
) => {
  try {
    const preference = await findOrCreate(
      gender_id,
      age_id,
      group_id,
      price_id
    );
    const receiver = await Receiver.create({
      order_id,
      name,
      phone,
      shipmentStatus: "결제완료",
      preference_id: preference.id,
      order_id,
    });
    return receiver;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { createReciever };
