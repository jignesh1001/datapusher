import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Not authorized" });
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
