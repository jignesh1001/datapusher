import type { Request, Response } from "express";
import Account from "../models/account.model.js";
import Destination from "../models/destination.model.js";
import { dataQueue } from "../config/bull.js";

interface DataHeaders {
  "cl-x-token"?: string;
  "cl-x-event-id"?: string;
}

export const receiveData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { "cl-x-token": token, "cl-x-event-id": event_id } =
      req.headers as DataHeaders;
    const data = req.body as Record<string, unknown>;

    if (!token || !event_id) {
      res.status(400).json({ success: false, message: "Missing headers" });
      return;
    }

    const account = await Account.findOne({ app_secret_token: token });
    if (!account) {
      res.status(401).json({ success: false, message: "Invalid app token" });
      return;
    }

    const destinations = await Destination.find({ account_id: account._id });
    if (!destinations.length) {
      res.status(404).json({ success: false, message: "No destinations found" });
      return;
    }

    await dataQueue.add("process-data", { event_id, account, data, destinations });
    console.log("Job added to queue:", event_id);

    res.json({ success: true, message: "Data Received" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};