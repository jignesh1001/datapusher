

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management endpoints
 */

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new account (Admin only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_name
 *             properties:
 *               account_name:
 *                 type: string
 *                 example: Zeel Infotech Pvt. Ltd.
 *               website:
 *                 type: string
 *                 example: https://zeel.com
 *     responses:
 *       201:
 *         description: Account created successfully
 *       403:
 *         description: Forbidden (insufficient rights)
 */

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all accounts of logged-in user
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accounts
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/accounts/{id}:
 *   put:
 *     summary: Update account by ID (Admin only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_name:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account updated
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Delete account (Admin only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted
 *       403:
 *         description: Forbidden
 */


import express from "express";
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "../controllers/account.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRole(["Admin"]), createAccount);
router.get("/", protect, cacheMiddleware("accounts"), getAccounts);
// router.get("/", protect, getAccounts);
router.put("/:id", protect, authorizeRole(["Admin"]), updateAccount);
router.delete("/:id", protect, authorizeRole(["Admin"]), deleteAccount);


export default router;
