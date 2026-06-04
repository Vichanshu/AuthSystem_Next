"use client";
import React from "react";
import Link from "next/link";


export default function LoginPage(){

    const [user, setUser]=React.useState({
                email:"",
                password:"",
                username:""
            })
    function handleLogin(){

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
                <Link href="/signup">
                    <p className="text-white underline">Don't have an account? Sign up here</p>
                </Link>
            </div>



        </div>
    )

}