import connectToDatabase from "@/dbConfig/connection"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connectToDatabase()


export async function POST(request:NextRequest){


    console.log("Received POST request to /api/login");
    // console.log("Request body:", await request.text());

    const request_body = await request.json();

    const {email,password} = request_body

    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json(
            {message:"User not found"},
            {status:404}
        )
    }

    const validPassword=await bcrypt.compare(password,user.password)

    if(!validPassword){
        return NextResponse.json({error:"Incorrect password entered"},{status:400})
    }
    console.log("User authenticated successfully:", user);
    //create Token

    const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
    }

    const token =await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})

    console.log("Generated token:", token);

    const response = NextResponse.json(
        {message:"Login successful"},
        {status:200}
    )

    response.cookies.set("token", token, {
        httpOnly: true,
    })

    return response

}
