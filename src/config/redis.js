import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

// connection lifecycle events
client.on("connect", () => {
  console.log("Redis client connecting...");
});

client.on("ready", () => {
  console.log("Redis client connected and ready ✅");
});

client.on("error", (err) => {
  console.error("Redis connection error ❌", err);
});

client.on("end", () => {
  console.log("Redis connection closed");
});

await client.connect();

// active health check
const pong = await client.ping();
console.log("Redis ping response:", pong); // should print "PONG"

export default client;
