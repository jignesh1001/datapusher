import mongoose, { Schema } from "mongoose";
const accountMemberSchema = new Schema({
    account_id: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const AccountMember = mongoose.model("AccountMember", accountMemberSchema);
export default AccountMember;
