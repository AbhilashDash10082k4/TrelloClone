import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import orgRoutes from "../src/orgs/orgs.router";
import { errorHandler } from "./middleware/error-handler";
import { clerkMiddleware, clerkClient, getAuth } from "@clerk/express";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi";

dotenv.config();

const app = express();

app.use(clerkMiddleware()); // Before routes and other middleware
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  cors({
    origin: (process.env.CORS_ORIGINS ?? "http://localhost:3000")
      .split(",")
      .map((origin) => origin.trim()),
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/api/v1/orgs", orgRoutes);

//after all routes
app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
