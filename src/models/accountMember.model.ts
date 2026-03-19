import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IAccountMember extends Document {
  account_id: Types.ObjectId;
  user_id: Types.ObjectId;
  role_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const accountMemberSchema = new Schema<IAccountMember>({
  account_id: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const AccountMember: Model<IAccountMember> = mongoose.model<IAccountMember>(
  "AccountMember",
  accountMemberSchema
);

export default AccountMember;