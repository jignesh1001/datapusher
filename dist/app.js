import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";
import destinationRoutes from "./routes/destination.routes.js";
import dataHandlerRoutes from "./routes/dataHandler.routes.js";
import logRoutes from "./routes/log.routes.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(readFileSync(join(__dirname, "config", "swagger.json"), "utf-8"));
const app = express();
// ── Core middleware ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
// ── Global rate limiter ────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalLimiter);
// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/server", dataHandlerRoutes);
app.use("/api/logs", logRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ── Global error handler ───────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
});
export default app;
