import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { Router } from "express";
import projectRoutes from "../src/projects/project.router";
import orgRoutes from "../src/orgs/orgs.router";
dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/api/v1/orgs", orgRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
