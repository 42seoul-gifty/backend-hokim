const { User } = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = require("../models").sequelize;

const findOrCreate = async (email, nickname, login_type, token) => {
  var user = await User.findOne({ where: { email, login_type } });
  if (!user)
    user = await User.create({
      email: email,
      nickname: nickname,
      login_type: login_type,
      token,
    });
  return user.toJSON();
};

const getAdminUsers = async (order) => {
  if (!order) order = "";
  if (order != "") order = "order by " + order;

  const user = await sequelize.query(
    `
    SELECT User.id, nickname, date_format(User.createdAt, '%Y-%m-%d')  as createdAt,
      count(Orders.user_id) as count,
      sum(Orders.price) as sum
    FROM User
      right join Orders on User.id = Orders.user_id
    where User.id is not null
    group by User.id
    ${order}
   ;
        `,
    { type: QueryTypes.SELECT }
  );
  return user;
};

module.exports = { findOrCreate, getAdminUsers };
