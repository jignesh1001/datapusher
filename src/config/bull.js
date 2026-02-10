import Queue from "bull";

const dataQueue = new Queue("dataQueue", {
   redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});
export {dataQueue};