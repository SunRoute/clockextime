import express from "express";
import cors from "cors";
import testRoutes from "./routes/test.routes.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import timeRecordsRoutes from "./routes/time-records.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/time-records", timeRecordsRoutes);

export default app;
