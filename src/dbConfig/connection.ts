import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDatabase() {
    try{
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongoose connected to the database.");
        });
        connection.on("error", (err) => {
            console.error("Database connection error:", err);
        });
        await mongoose.connect(process.env.MONGO_DB_URI!);
        console.log("Connected to the database successfully!");
    }
    catch(error){
        console.error("Error connecting to the database:", error);
    }


}


connectToDatabase();

// console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);