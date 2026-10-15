import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import orgRoutes from "../src/orgs/orgs.router";
import { errorHandler } from "./middleware/error-handler";
import { clerkMiddleware } from "@clerk/express";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi";
import { clerkUserWebhook } from "./users/user.webhook";
import { apiLimiter } from "./middleware/rate-limit";
import { requestLogger } from "./middleware/request-logger";
import { env } from "./config/env";

dotenv.config();

const app = express();

app.use(clerkMiddleware()); // Before routes and other middleware
app.use(helmet());
app.use(requestLogger);
const allowedOrigins = env.CORS_ORIGINS.split(",").map((origin) =>
  origin.trim(),
);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkUserWebhook,
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.use("/api/v1", apiLimiter);
app.use("/api/v1/orgs", orgRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

//after all routes
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
