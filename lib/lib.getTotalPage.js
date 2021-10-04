var getTotalPage = async (limit, model, include, condition) => {
  if (totalPage) {
    var totalPage = await model.count({
      include,
      where: condition,
    });
  } else {
    var totalPage = await model.count({
      where: condition,
    });
  }

  totalPage =
    totalPage % limit == 0
      ? Math.floor(totalPage / parseFloat(limit)) - 1
      : Math.floor(totalPage / parseFloat(limit));

  return totalPage;
};
module.exports = { getTotalPage };
