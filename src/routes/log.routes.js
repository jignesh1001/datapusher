import express from "express";
import { getLogs } from "../controllers/log.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", protect, getLogs);
export default router;
