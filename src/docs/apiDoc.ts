import swaggerJsDoc from "swagger-jsdoc";

const options: swaggerJsDoc.Options = {
  definition: {
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
    components: {
      securitySchemes: {
        authsecurity: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        authsecurity: [],
      },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Auth" }, { name: "Events" }, { name: "Attendance" }],
  },
  apis: ["./src/docs/*.docs.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
