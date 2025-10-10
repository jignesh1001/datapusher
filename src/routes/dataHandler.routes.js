


/**
 * @swagger
 * tags:
 *   name: Data Handler
 *   description: Handles incoming JSON data for processing
 */

/**
 * @swagger
 * /server/incoming_data:
 *   post:
 *     summary: Receive and queue incoming data for forwarding
 *     tags: [Data Handler]
 *     parameters:
 *       - in: header
 *         name: CL-X-TOKEN
 *         required: true
 *         schema:
 *           type: string
 *         description: App secret token for authentication
 *       - in: header
 *         name: CL-X-EVENT-ID
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique event ID for tracking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               key: value
 *               another: data
 *     responses:
 *       200:
 *         description: Data received successfully
 *       400:
 *         description: Missing headers
 *       401:
 *         description: Invalid app token
 *       404:
 *         description: No destinations found
 *       429:
 *         description: Rate limit exceeded
 */


import express from "express";
import { receiveData } from "../controllers/dataHandler.controller.js";
import { createAccountLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/incoming_data", createAccountLimiter, express.json(), receiveData);
// router.post("/incoming_data",createAccountLimiter, express.json(), receiveData);



export default router;
