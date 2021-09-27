const app = require("./App.js");
require("dotenv").config();

const server = app.listen(process.env.PORT, function () {
  console.log("Express listening on port", process.env.PORT);
});
