import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);

export default app;
