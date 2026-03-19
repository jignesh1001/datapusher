import axios, { Method } from "axios";
import { Worker, Job } from "bullmq";
import Log from "../models/log.model.js";
import { connection, DataJobPayload } from "../config/bull.js";

interface Destination {
  _id: string;
  url: string;
  http_method: Method;
  headers: Record<string, string>;
}

interface Account {
  _id: string;
}

interface DataJob extends DataJobPayload {
  event_id: string;
  account: Account;
  data: Record<string, unknown>;
  destinations: Destination[];
}

const processJob = async (job: Job<DataJob>): Promise<void> => {
  const { event_id, account, data, destinations } = job.data;

  console.log(
    `Processing job: ${event_id} | destinations: ${destinations?.length ?? 0}`
  );

  await Promise.allSettled(
    destinations.map(async (dest: Destination) => {
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
      } catch (err) {
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
    })
  );
};

const worker = new Worker<DataJob>("dataQueue", processJob, { connection });

worker.on("completed", (job: Job<DataJob>) =>
  console.log(`Job ${job.id} completed | event: ${job.data.event_id}`)
);

worker.on("failed", (job: Job<DataJob> | undefined, err: Error) =>
  console.error(`Job ${job?.id} failed:`, err.message)
);

worker.on("error", (err: Error) =>
  console.error("Worker error:", err.message)
);

console.log("Worker started and waiting for jobs...");

export default worker;