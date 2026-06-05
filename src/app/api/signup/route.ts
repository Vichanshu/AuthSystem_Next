import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/dbConfig/connection";
connectToDatabase()

export async function POST(request:NextRequest){

    try {

        console.log("Received POST request to /api/signup");

        const requestBody = await request.json();
        const {email,username,password} = requestBody

        const user= await User.findOne({email})

        if(user){
            return NextResponse.json({message:"user already exist"},{status:400})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser= new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = newUser.save()

        return NextResponse.json({
            "message":"user created successfully",
            "status":201
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }



}