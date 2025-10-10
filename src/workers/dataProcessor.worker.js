import axios from "axios";
import { dataQueue } from "../config/bull.js";
import Log from "../models/log.model.js";

console.log("Worker started and waiting for jobs...");

dataQueue.process(async (job) => {
  const { event_id, account, data, destinations } = job.data;
  console.log("Processing job:", event_id, "destinations:", destinations?.length);

  for (const dest of destinations) {
    try {
      console.log(`Sending data to ${dest.url}...`);
      await axios({
        method: dest.http_method,
        url: dest.url,
        headers: dest.headers,
        data,
      });

      await Log.create({
        event_id,
        account_id: account._id,
        destination_id: dest._id,
        received_data: data,
        processed_timestamp: new Date(),
        status: "success",
      });

      console.log("Log created for destination:", dest._id);
    } catch (err) {
      console.error("Error sending to destination:", dest.url, err.message);

      await Log.create({
        event_id,
        account_id: account._id,
        destination_id: dest._id,
        received_data: data,
        processed_timestamp: new Date(),
        status: "failed",
      });
    }
  }
});
