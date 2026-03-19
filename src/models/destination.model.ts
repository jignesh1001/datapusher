import mongoose, { Document, Model, Schema, Types } from "mongoose";

type HttpMethod = "POST" | "PUT" | "PATCH";

export interface IDestination extends Document {
  account_id: Types.ObjectId;
  url: string;
  http_method: HttpMethod;
  headers: Record<string, string>;
  created_at: Date;
  updated_at: Date;
  created_by?: Types.ObjectId;
  updated_by?: Types.ObjectId;
}

const destinationSchema = new Schema<IDestination>({
  account_id: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  url: { type: String, required: true },
  http_method: { type: String, required: true, enum: ["POST", "PUT", "PATCH"] },
  headers: { type: Object, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: Schema.Types.ObjectId, ref: "User" },
});

const Destination: Model<IDestination> = mongoose.model<IDestination>(
  "Destination",
  destinationSchema
);

export default Destination;