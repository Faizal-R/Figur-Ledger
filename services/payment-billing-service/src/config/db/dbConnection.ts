import mongoose,{ SortOrder} from "mongoose";

export {SortOrder}
export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1)
    }
    
};