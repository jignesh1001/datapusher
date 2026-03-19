import mongoose, { Document, Model, Schema, Types } from "mongoose";

type LogStatus = "success" | "failed";

export interface ILog extends Document {
  event_id: string;
  account_id: Types.ObjectId;
  destination_id: Types.ObjectId;
  received_timestamp: Date;
  processed_timestamp?: Date;
  received_data: Record<string, unknown>;
  status: LogStatus;
}

const logSchema = new Schema<ILog>({
  event_id: { type: String, unique: true, required: true },
  account_id: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  destination_id: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
  received_timestamp: { type: Date, default: Date.now },
  processed_timestamp: { type: Date },
  received_data: { type: Object, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
});

const Log: Model<ILog> = mongoose.model<ILog>("Log", logSchema);

export default Log;