import Destination from "../models/destination.model.js";
import { Types } from "mongoose";
export const createDestination = async (req, res) => {
    try {
        const { account_id, url, http_method, headers } = req.body;
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
    }
    catch (err) {
        const error = err;
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getDestinationsByAccount = async (req, res) => {
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
    }
    catch (err) {
        const error = err;
        res.status(500).json({ success: false, message: error.message });
    }
};
