import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  url: { type: String, required: true },
  http_method: { type: String, required: true, enum: ["POST", "PUT", "PATCH"] },
  headers: { type: Object, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Destination", destinationSchema);
