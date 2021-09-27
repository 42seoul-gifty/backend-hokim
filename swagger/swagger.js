const swaggereJsdoc = require("swagger-jsdoc");
require("dotenv").config();
const path = require("path");

console.log(process.env.HOST);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [{ url: process.env.SITE_DOMAIN }],
  },
  apis: [
    path.join(__dirname, "./schema/*.js"),
    path.join(__dirname, "./controller/*.js"),
  ],
};
const specs = swaggereJsdoc(options);
module.exports = { specs };
