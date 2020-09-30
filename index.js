import express from "express";

import { router as jwtAuthRoutes } from "./routes/jwtAuth.js";
import { router as dashboardRouter } from "./routes/dashboard.js";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

// Initializing App
dotenv.config();
const app = express();

// Middlewares

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("common"));
app.use(helmet());

// Routes

app.use("/auth", jwtAuthRoutes);
app.use("/dashboard", dashboardRouter);

app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`)
);
