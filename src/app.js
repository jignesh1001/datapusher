import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";
import destinationRoutes from "./routes/destination.routes.js";
import dataHandlerRoutes from "./routes/dataHandler.routes.js";
import logRoutes from "./routes/log.routes.js";
import { swaggerSpec, swaggerUiSetup } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,

});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/server", dataHandlerRoutes);
app.use("/api/logs", logRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUiSetup.setup(swaggerSpec));

export default app;
