import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { Router } from "express";
import projectRoutes from "../src/projects/project.router";
dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
const apiRoutes = Router();

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
apiRoutes.use(projectRoutes);

// Mount on /api and root /
app.use("/api", apiRoutes);
app.use("/", apiRoutes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
