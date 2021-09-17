const { getKoreaTime } = require("./lib.getKoreaTime");
require("dotenv").config();
var CryptoJS = require("crypto-js");

function makeSignature(time) {
  var space = " "; // one space
  var newLine = "\n"; // new line
  var method = "POST"; // method
  var url = `/sms/v2/services/${process.env.SMS_ID}/messages`; // url (include query string)
  var timestamp = time; // current timestamp (epoch)
  var accessKey = `${process.env.SMS_ACCESS_KEY_ID}`; // access key id (from portal or Sub Account)
  var secretKey = `${process.env.SMS_SECRET_KEY_ID}`; // secret key (from portal or Sub Account)

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  var hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}
module.exports = { makeSignature };
