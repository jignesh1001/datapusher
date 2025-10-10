import Destination from "../models/destination.model.js";

export const createDestination = async (req, res) => {
  try {
    const { account_id, url, http_method, headers } = req.body;
    if (!account_id || !url || !http_method || !headers)
      return res.status(400).json({ success: false, message: "All fields required" });

    const dest = await Destination.create({
      account_id,
      url,
      http_method,
      headers,
      created_by: req.user._id,
    });

    res.status(201).json({ success: true, data: dest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDestinationsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const dests = await Destination.find({ account_id: accountId });
    res.json({ success: true, data: dests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
