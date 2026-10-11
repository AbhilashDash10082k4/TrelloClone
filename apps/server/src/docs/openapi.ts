import swaggerJsdoc from "swagger-jsdoc";

export const openapiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Agentic Trello API",
      version: "1.0.0",
    },
    servers: [{ url: "/api/v1" }],
    components: {
      securitySchemes: {
        ClerkBearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/**/*.router.ts"],
});
