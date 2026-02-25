import express from "express";
import cors from "cors";
import testRoutes from "./routes/test.routes.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import timeRecordRoutes from "./routes/time-record.routes.js";
import overtimeRoutes from "./routes/overtime.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/time-record", timeRecordRoutes);
app.use("/api/overtime", overtimeRoutes);
app.use("/api/user", userRoutes);

export default app;
