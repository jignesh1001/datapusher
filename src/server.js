import app from "./app.js";
import dotenv from "dotenv";
import "./workers/dataProcessor.worker.js";
import { connectDB } from "./config/db.js";
import { seedRoles } from "./config/seedRoles.js";

dotenv.config();
const PORT = process.env.PORT;

connectDB().then(seedRoles);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
