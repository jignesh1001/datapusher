import mongoose, { Document, Model, Schema, Types } from "mongoose";
import crypto from "crypto";

export interface IAccount extends Document {
  account_name: string;
  app_secret_token: string;
  website?: string;
  created_by: Types.ObjectId;
  updated_by?: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const accountSchema = new Schema<IAccount>({
  account_name: { type: String, required: true },
  app_secret_token: {
    type: String,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
  website: { type: String },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Account: Model<IAccount> = mongoose.model<IAccount>(
  "Account",
  accountSchema
);

export default Account;