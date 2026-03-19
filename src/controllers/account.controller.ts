import type { Request, Response } from "express";
import Account from "../models/account.model.js";
import AccountMember from "../models/accountMember.model.js";
import Role from "../models/role.model.js";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  };
}

interface CreateAccountBody {
  account_name?: string;
  website?: string;
}

interface UpdateAccountBody {
  account_name?: string;
  website?: string;
}

export const createAccount = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { account_name, website } = req.body as CreateAccountBody;

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
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAccounts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const memberships = await AccountMember.find({
      user_id: req.user?._id,
    }).populate("account_id");

    res.json({
      success: true,
      data: memberships.map((m) => m.account_id),
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAccount = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { account_name, website } = req.body as UpdateAccountBody;

    const updated = await Account.findByIdAndUpdate(
      id,
      { account_name, website, updated_by: req.user?._id },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    await AccountMember.deleteMany({ account_id: id });
    res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
};