"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage(){
    const router = useRouter();

    const [user, setUser]=React.useState({
                email:"",
                password:"",
                username:""
            })
    async function handleSignUp(){
        try{
            const response = await axios.post("/api/signup",user);
            console.log("User data sent to /api/signup:", user);
            router.push("/profile")
        }
        catch(error){
            console.error("Error occurred while sending user data:", error);
        }
    }

    return (
        <div className="h-screen justify-center items-center flex">
            <div className="flex flex-col gap-4 justify-center items-center bg-gray-700/30 pt-8 pl-15 pr-15 pb-8 rounded-2xl">
                <h1 className="text-2xl p-2">Sign Up Page</h1>
                <label htmlFor="userName">Username:</label>
                <input className="p-3 border-2 border-white rounded-xl"
                    type="text"
                    id="userName"
                    value={user.username}
                    placeholder="username"
                    onChange={(e)=>setUser({...user,username:e.target.value})}
                />
                <label htmlFor="email">Email: </label>
                <input className="p-3 border-2 border-white rounded-xl"
                    type="email"
                    id="email"
                    value={user.email}
                    placeholder="email"
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                />
                <label htmlFor="password">Password: </label>
                <input className="p-3 border-2 border-white rounded-xl"
                    type="password"
                    id="password"
                    value={user.password}
                    placeholder="password"
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                />
                <button
                    className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <Link href="/login">
                    <p className="text-white underline">Already have an account? Login here</p>
                </Link>
            </div>



        </div>
    )

}