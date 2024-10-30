import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function DB_Connection() {
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
        console.error("MongoDB URI not found in environment variables");
        return;
    }
    try {
        await mongoose.connect(dbURI);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}

export default DB_Connection;
