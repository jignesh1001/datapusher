
/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: Webhook destination management
 */

/**
 * @swagger
 * /api/destinations:
 *   post:
 *     summary: Create a new destination (Admin only)
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_id
 *               - url
 *               - http_method
 *               - headers
 *             properties:
 *               account_id:
 *                 type: string
 *               url:
 *                 type: string
 *                 example: https://webhook.site/abc123
 *               http_method:
 *                 type: string
 *                 example: POST
 *               headers:
 *                 type: object
 *                 example:
 *                   Content-Type: application/json
 *                   APP_ID: test-app-id
 *     responses:
 *       201:
 *         description: Destination created
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/destinations/{accountId}:
 *   get:
 *     summary: Get all destinations for a specific account
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: List of destinations
 *       401:
 *         description: Unauthorized
 */


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
// Get destinations by account with cache
router.get("/:accountId", protect, cacheMiddleware("destinations"), getDestinationsByAccount);
// router.get("/:accountId", protect, getDestinationsByAccount);

export default router;

