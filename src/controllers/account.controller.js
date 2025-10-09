import Account from "../models/account.model.js";
import AccountMember from "../models/accountMember.model.js";
import Role from "../models/role.model.js";

// Create new account (for Admin )
export const createAccount = async (req, res) => {
  try {
    const { account_name, website } = req.body;
    if (!account_name)
      return res.status(400).json({ success: false, message: "Account name required" });

    const account = await Account.create({
      account_name,
      website,
      created_by: req.user._id,
      updated_by: req.user._id,
    });

    // Add creator as admin 
    const adminRole = await Role.findOne({ role_name: "Admin" });
    await AccountMember.create({
      account_id: account._id,
      user_id: req.user._id,
      role_id: adminRole._id,
    });

    res.status(201).json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all accounts for currently logged in user
export const getAccounts = async (req, res) => {
  try {
    const memberships = await AccountMember.find({ user_id: req.user._id }).populate("account_id");
    res.json({ success: true, data: memberships.map((m) => m.account_id) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update account
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { account_name, website } = req.body;
    const updated = await Account.findByIdAndUpdate(
      id,
      { account_name, website, updated_by: req.user._id },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete account
export const deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    await AccountMember.deleteMany({ account_id: req.params.id });
    res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
