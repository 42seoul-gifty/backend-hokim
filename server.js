const app = require("./App.js");
const port = 3000;

const server = app.listen(port, function () {
  console.log("Express listening on port", port);
});
