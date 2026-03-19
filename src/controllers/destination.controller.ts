import type { Request, Response } from "express";
import Destination from "../models/destination.model.js";
import { Types } from "mongoose";

interface CreateDestinationBody {
  account_id: string;
  url: string;
  http_method: "POST" | "PUT" | "PATCH";
  headers: Record<string, string>;
}

interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  };
}

export const createDestination = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { account_id, url, http_method, headers } =
      req.body as CreateDestinationBody;

    if (!account_id || !url || !http_method || !headers) {
      res.status(400).json({ success: false, message: "All fields required" });
      return;
    }

    const dest = await Destination.create({
      account_id: new Types.ObjectId(account_id),
      url,
      http_method,
      headers,
      created_by: req.user?._id,
    });

    res.status(201).json({ success: true, data: dest });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationsByAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accountId = Array.isArray(req.params.accountId)
      ? req.params.accountId[0]
      : req.params.accountId;

    if (!accountId) {
      res.status(400).json({ success: false, message: "Account ID is required" });
      return;
    }

    const dests = await Destination.find({
      account_id: new Types.ObjectId(accountId),
    });

    res.json({ success: true, data: dests });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};