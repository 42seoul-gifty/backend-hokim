const app = require("./App.js");
const dotenv = require("dotenv");
dotenv.config();

const server = app.listen(process.env.PORT, function () {
  console.log("Express listening on port", process.env.PORT);
  setTimeout(() => {
    process.exit(0);
  }, 10000);
});
