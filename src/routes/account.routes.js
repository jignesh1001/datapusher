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
router.get("/", protect, getAccounts);
router.put("/:id", protect, authorizeRole(["Admin"]), updateAccount);
router.delete("/:id", protect, authorizeRole(["Admin"]), deleteAccount);

// Get accounts with cache


export default router;

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all accounts for the current user
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Successfully retrieved accounts
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
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
 *       201:
 *         description: Account created
 */
