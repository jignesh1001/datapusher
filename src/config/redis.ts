import { createClient, RedisClientType } from "redis";

const client: RedisClientType = createClient({
  url:process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries: number): number | Error => {
      if (retries > 5) {
        console.error("Redis max reconnection attempts reached");
        return new Error("Redis max reconnection attempts reached");
      }
      return Math.min(retries * 200, 2000); // exponential backoff, capped at 2s
    },
  },
});

// connection lifecycle events
client.on("connect", () => console.log("Redis client connecting..."));
client.on("ready", () => console.log("Redis client connected and ready ✅"));
client.on("error", (err: Error) => console.error("Redis connection error ❌", err));
client.on("end", () => console.log("Redis connection closed"));

const connectRedis = async (): Promise<RedisClientType> => {
  try {
    await client.connect();
    const pong = await client.ping();
    console.log("Redis ping response:", pong);
    return client;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("Failed to connect to Redis:", message);
    process.exit(1);
  }
};

await connectRedis();

export default client;