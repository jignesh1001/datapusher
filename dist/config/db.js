import mongoose from "mongoose";
export const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        console.error("MONGO_URL is not defined in environment variables");
        process.exit(1);
    }
    mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));
    mongoose.connection.on("reconnected", () => console.log("MongoDB reconnected"));
    try {
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected error";
        console.error("DB connection failed:", message);
        process.exit(1);
    }
};
