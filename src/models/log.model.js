import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  event_id: { type: String, unique: true, required: true },
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  destination_id: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
  received_timestamp: { type: Date, default: Date.now },
  processed_timestamp: { type: Date },
  received_data: { type: Object, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
});

export default mongoose.model("Log", logSchema);
