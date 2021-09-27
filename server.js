const app = require("./App.js");
require("dotenv").config();
const { logger } = require("./config/winston");

const server = app.listen(process.env.PORT, function () {
  logger.info("Express listening on port", process.env.PORT);
});
