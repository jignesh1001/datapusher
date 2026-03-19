import mongoose, { Schema } from "mongoose";
const roleSchema = new Schema({
    role_name: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Role = mongoose.model("Role", roleSchema);
export default Role;
