import mongoose from "mongoose";

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
    cachedConnection = global.mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not set");
        }
        if (cachedConnection.conn) {
            return cachedConnection.conn;
        }
        if (!cachedConnection.promise) {
            cachedConnection.promise = mongoose.connect(process.env.MONGO_URI).then((mongooseInstance) => {
                console.log("MongoDB connected successfully");
                return mongooseInstance;
            });
        }
        cachedConnection.conn = await cachedConnection.promise;
        return cachedConnection.conn;
    } catch (error) {
        console.error("Database connection error:", error.message);
        throw error;
    }
}
export default connectDB;
