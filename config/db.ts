import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default main