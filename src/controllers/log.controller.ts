import type{Request, Response } from "express";
import Log, {type ILog } from "../models/log.model.js";
import { Types } from "mongoose";

interface LogFilterQuery {
  account_id?: string;
  status?: "success" | "failed";
  start?: string;
  end?: string;
}

interface LogFilter {
  account_id?: Types.ObjectId;
  status?: "success" | "failed";
  received_timestamp?: { $gte: Date; $lte: Date };
}

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { account_id, status, start, end } = req.query as LogFilterQuery;
    const filter: LogFilter = {};

    if (account_id) filter.account_id = new Types.ObjectId(account_id);
    if (status) filter.status = status;
    if (start && end)
      filter.received_timestamp = { $gte: new Date(start), $lte: new Date(end) };

    const logs = await Log.find(filter)
      .populate<{ account_id: ILog["account_id"] }>("account_id")
      .populate<{ destination_id: ILog["destination_id"] }>("destination_id")
      .sort({ received_timestamp: -1 });

    res.json({ success: true, data: logs });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};