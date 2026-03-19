import axios from "axios";
import { Worker } from "bullmq";
import Log from "../models/log.model.js";
import { connection } from "../config/bull.js";
const processJob = async (job) => {
    const { event_id, account, data, destinations } = job.data;
    console.log(`Processing job: ${event_id} | destinations: ${destinations?.length ?? 0}`);
    await Promise.allSettled(destinations.map(async (dest) => {
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
            console.log(`Log created for destination: ${dest._id}`);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error";
            console.error(`Error sending to ${dest.url}:`, message);
            await Log.create({
                event_id,
                account_id: account._id,
                destination_id: dest._id,
                received_data: data,
                processed_timestamp: new Date(),
                status: "failed",
            });
        }
    }));
};
const worker = new Worker("dataQueue", processJob, { connection });
worker.on("completed", (job) => console.log(`Job ${job.id} completed | event: ${job.data.event_id}`));
worker.on("failed", (job, err) => console.error(`Job ${job?.id} failed:`, err.message));
worker.on("error", (err) => console.error("Worker error:", err.message));
console.log("Worker started and waiting for jobs...");
export default worker;
