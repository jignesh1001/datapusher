import Account from "../models/account.model.js";
import AccountMember from "../models/accountMember.model.js";
import Role from "../models/role.model.js";
export const createAccount = async (req, res) => {
    try {
        const { account_name, website } = req.body;
        if (!account_name) {
            res.status(400).json({ success: false, message: "Account name required" });
            return;
        }
        const account = await Account.create({
            account_name,
            website,
            created_by: req.user?._id,
            updated_by: req.user?._id,
        });
        const adminRole = await Role.findOne({ role_name: "Admin" });
        if (!adminRole) {
            res.status(500).json({ success: false, message: "Admin role not found" });
            return;
        }
        await AccountMember.create({
            account_id: account._id,
            user_id: req.user?._id,
            role_id: adminRole._id,
        });
        res.status(201).json({ success: true, data: account });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getAccounts = async (req, res) => {
    try {
        const memberships = await AccountMember.find({
            user_id: req.user?._id,
        }).populate("account_id");
        res.json({
            success: true,
            data: memberships.map((m) => m.account_id),
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ success: false, message: error.message });
    }
};
export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { account_name, website } = req.body;
        const updated = await Account.findByIdAndUpdate(id, { account_name, website, updated_by: req.user?._id }, { new: true });
        res.json({ success: true, data: updated });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ success: false, message: error.message });
    }
};
export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        await Account.findByIdAndDelete(id);
        await AccountMember.deleteMany({ account_id: id });
        res.json({ success: true, message: "Account deleted" });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ success: false, message: error.message });
    }
};
