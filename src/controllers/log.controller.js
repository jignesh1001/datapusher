import Log from "../models/log.model.js";

export const getLogs = async (req, res) => {
  try {
    const { account_id, status, start, end } = req.query;
    const filter = {};

    if (account_id) filter.account_id = account_id;
    if (status) filter.status = status;
    if (start && end)
      filter.received_timestamp = { $gte: new Date(start), $lte: new Date(end) };

    const logs = await Log.find(filter)
      .populate("account_id destination_id")
      .sort({ received_timestamp: -1 });

    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
