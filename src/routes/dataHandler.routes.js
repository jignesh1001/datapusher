import express from "express";
import { receiveData } from "../controllers/dataHandler.controller.js";
import { createAccountLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/incoming_data", createAccountLimiter, express.json(), receiveData);
router.post("/incoming_data",createAccountLimiter, express.json(), receiveData);



export default router;
