import { SwaggerDefinition } from "swagger-jsdoc";

const options: SwaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "Event Mgmt System API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3030",
      description: "Dev server",
    },
  ],
  schemes: ["http", "https"],
  basePath: "/api",
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  apis: ["./routes/*.ts"],
  tags: [{ name: "Auth" }, { name: "Events" }, { name: "Attendance" }],
};

export default options;
