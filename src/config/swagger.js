import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Data Pusher API",
      version: "1.0.0",
      description: "Node.js Data Forwarding System for Accounts and Destinations"
    },
    servers: [{ url: "http://localhost:5000" }]
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiSetup = swaggerUi;
