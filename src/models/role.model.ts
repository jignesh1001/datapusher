import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRole extends Document {
  role_name: string;
  created_at: Date;
  updated_at: Date;
}

const roleSchema = new Schema<IRole>({
  role_name: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Role: Model<IRole> = mongoose.model<IRole>("Role", roleSchema);

export default Role;