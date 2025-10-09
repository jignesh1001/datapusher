import express from "express";
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "../controllers/account.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRole(["Admin"]), createAccount);
router.get("/", protect, getAccounts);
router.put("/:id", protect, authorizeRole(["Admin"]), updateAccount);
router.delete("/:id", protect, authorizeRole(["Admin"]), deleteAccount);

export default router;
