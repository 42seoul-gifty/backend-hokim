const getKoreaTime = () => {
  let today = new Date();
  today = new Date(
    today.getTime() + today.getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000
  );
  return today;
};

module.exports = { getKoreaTime };
