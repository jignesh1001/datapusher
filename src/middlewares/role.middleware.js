import AccountMember from "../models/accountMember.model.js";
import Role from "../models/role.model.js";

export const authorizeRole = (roles) => {
  console.log(roles)
  return async (req, res, next) => {
    try {
      const membership = await AccountMember.findOne({ user_id: req.user._id }).populate("role_id");
      if (!membership || !roles.includes(membership.role_id.role_name))
        return res.status(403).json({ success: false, message: "Forbidden: insufficient rights" });
      next();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
};
