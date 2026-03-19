import app from "./app.js";
import dotenv from "dotenv";
import "./workers/dataProcessor.worker.js";
import { connectDB } from "./config/db.js";
import { seedRoles } from "./config/seedRoles.js";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const start = async (): Promise<void> => {
  await connectDB();
  await seedRoles();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : "Unexpected error";
  console.error("Failed to start server:", message);
  process.exit(1);
});