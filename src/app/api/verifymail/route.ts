import { NextRequest } from "next/server";
import User from "@/models/userModel";
import connectToDatabase from "@/dbConfig/connection";


export async function GET(request: NextRequest) {


    try {
        await connectToDatabase();
        const token = request.nextUrl.searchParams.get("token");

        if (!token) {
            return new Response("Invalid or missing token", { status: 400 });
        }
        const user = await User.findOne({verifyToken: token});
        if(!user){
            return new Response("Invalid token", { status: 400 });
        }

        if(user.verifyTokenExpiry && user.verifyTokenExpiry < Date.now()){
            return new Response("Token expired", { status: 400 });
        }

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return new Response("Email verified successfully", { status: 200 });
    } catch {
        return new Response("Error occurred while verifying email", { status: 500 });
    }
}
