import Account from "../models/account.model.js";
import Destination from "../models/destination.model.js";
import { dataQueue } from "../config/bull.js";

export const receiveData = async (req, res) => {
  try {
    const token = req.headers["cl-x-token"];
    const event_id = req.headers["cl-x-event-id"];
    const data = req.body;

    if (!token || !event_id)
      return res.status(400).json({ success: false, message: "Missing headers" });

    const account = await Account.findOne({ app_secret_token: token });
    if (!account)
      return res.status(401).json({ success: false, message: "Invalid app token" });

    const destinations = await Destination.find({ account_id: account._id });
    if (!destinations.length)
      return res.status(404).json({ success: false, message: "No destinations found" });


    await dataQueue.add({ event_id, account, data, destinations });
     console.log("Job added to queue:", event_id);

    res.json({ success: true, message: "Data Received" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
