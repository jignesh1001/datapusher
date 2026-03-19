import jwt from "jsonwebtoken";
export const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id: user._id.toString(), email: user.email }, secret, {
        expiresIn: "1d",
    });
};
