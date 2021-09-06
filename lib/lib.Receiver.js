const { Receiver } = require("../models");
const { findOrCreate } = require("./lib.Preference");
const { QueryTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const { Gender } = require("../config/constant");

const createReciever = async (name, phone, order_id) => {
  try {
    const receiver = await Receiver.create({
      order_id,
      name,
      phone,
      shipmentStatus: "결제완료",
      order_id,
    });
    return receiver;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findFilteredReceiver = async (startDate, endDate) => {
  var filter = "";
  if (
    startDate != null &&
    startDate != "" &&
    endDate != null &&
    endDate != ""
  ) {
    filter = `where  Receiver.createdAt between '${startDate}' and '${endDate}'`;
  } else if (startDate != null && startDate != "") {
    filter = `where  Receiver.createdAt >= '${startDate}'`;
  } else if (endDate != null && endDate != "") {
    filter = `where  Receiver.createdAt < '${endDate}'`;
  }

  try {
    var receiver = await sequelize.query(
      `
      SELECT 
          Receiver.id, Receiver.phone, Receiver.address,
          Receiver.detailAddress, Receiver.shipmentStatus, Receiver.createdAt,
          temp.gender_id, temp.age, temp.price,
          Product.name as product
      FROM Receiver
      Join Orders on Orders.id = Receiver.order_id
      LEFT JOIN
          (SELECT 
              Preference.id,Preference.gender_id,
              PreferenceAge.\`value\` AS age,PreferencePrice.\`value\` AS price
          FROM
              Preference
          JOIN PreferenceAge ON PreferenceAge.id = Preference.age_id
          JOIN PreferencePrice ON PreferencePrice.id = Preference.price_id) temp 
          ON Orders.preference_id = temp.id
      LEFT JOIN Product ON Receiver.product_id = Product.id
      ${filter}
      ;
          `,
      { type: QueryTypes.SELECT }
    );
    receiver = receiver.map((element) => {
      element["gender"] = Gender[element.gender_id].value;
      return element;
    });
    return receiver;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { createReciever, findFilteredReceiver };
