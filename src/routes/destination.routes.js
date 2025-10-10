import express from "express";
import {
  createDestination,
  getDestinationsByAccount,
} from "../controllers/destination.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRole(["Admin"]), createDestination);
router.get("/:accountId", protect, cacheMiddleware("destinations"), getDestinationsByAccount);
router.get("/:accountId", protect, getDestinationsByAccount);
// Get destinations by account with cache

export default router;
