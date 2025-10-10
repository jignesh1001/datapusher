
/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Logs tracking data processing and webhooks
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get logs with optional filters
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: account_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter logs by account ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter logs by status (success/failed)
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date range
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date range
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *       401:
 *         description: Unauthorized
 */


import express from "express";
import { getLogs } from "../controllers/log.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", protect, getLogs);
export default router;

