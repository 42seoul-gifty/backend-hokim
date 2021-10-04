const swaggereJsdoc = require("swagger-jsdoc");
require("dotenv").config();
const path = require("path");

const options = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    host: process.env.HOST,
    basePath: "/",
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
  apis: [
    path.join(__dirname, "./schema/*.js"),
    path.join(__dirname, "./controller/*.js"),
  ],
};
const specs = swaggereJsdoc(options);
module.exports = { specs };
