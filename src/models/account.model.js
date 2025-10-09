import mongoose from "mongoose";
import crypto from "crypto";

const accountSchema = new mongoose.Schema({
  account_name: { type: String, required: true },
  app_secret_token: {
    type: String,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
  website: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Account", accountSchema);
