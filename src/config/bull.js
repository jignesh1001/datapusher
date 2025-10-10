import Queue from "bull";
import redis from "./redis.js";

export const dataQueue = new Queue("dataQueue", {
  redis: { port: 6379, host: "127.0.0.1" },
});
