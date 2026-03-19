import { Request, Response, NextFunction } from "express";
import AccountMember from "../models/accountMember.model.js";

export const authorizeRole =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const membership = await AccountMember.findOne({
        user_id: req.user?._id,
      }).populate<{ role_id: { role_name: string } }>("role_id");

      if (!membership || !roles.includes(membership.role_id.role_name)) {
        res
          .status(403)
          .json({ success: false, message: "Forbidden: insufficient rights" });
        return;
      }

      next();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      res.status(500).json({ success: false, message });
    }
  };