const app = require("./App.js");
const dotenv = require("dotenv");
dotenv.config();

const server = app.listen(process.env.PORT, function () {
  console.log("Express listening on port", process.env.PORT);
});
