"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import Router, { useRouter } from "next/navigation";


export default function LoginPage(){
    const router=useRouter();
    const [errorMessage, setErrorMessage] = React.useState("");


    const [user, setUser]=React.useState({
                email:"",
                password:"",
                username:""
            })
    async function handleLogin(){
        try{
            console.log("login data sent")
            const response =await axios.post("/api/login",user)
            console.log("logged in successfully")
            console.log(response.data)
            console.log(`pushing user to /profile/${response.data.username}`)
            router.push(`/profile/${response.data.username}`)

        }
        catch(error){
            console.error("Error occurred while sending user data:", error);
            setErrorMessage("Invalid email or password");
        }

    }

    return (
        <div className="h-screen justify-center items-center flex">
            <div className="flex flex-col gap-4 justify-center items-center bg-gray-700/30 pt-8 pl-15 pr-15 pb-8 rounded-2xl">
                <h1 className="text-2xl p-2">Login Page</h1>
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
                    onClick={handleLogin}
                >
                    Login
                </button>

                {errorMessage? <p className="text-red-500">{errorMessage}</p> : null}

                <Link href="/signup">
                    <p className="text-white underline">Don't have an account? Sign up here</p>
                </Link>
            </div>



        </div>
    )

}