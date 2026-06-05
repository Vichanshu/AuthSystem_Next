"use client";

import { useEffect, useState } from "react";
import axios from "axios";



export default function VerifyMail() {
    const [message, setMessage] = useState("");

    useEffect(() =>{
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        if (tokenFromUrl && tokenFromUrl.length > 0) {
            axios.get(`/api/verifymail?token=${encodeURIComponent(tokenFromUrl)}`)
            .then(()=>{
                setMessage("Email verified successfully! You can now log in.");
            })
            .catch(error=>{
                if(error.response){
                    setMessage(error.response.data);
                }
                else{
                    setMessage("An error occurred while verifying your email. Please try again later.");
                }
            })
        }
    },[])


    return (
        <div className="h-screen justify-center items-center flex">
            <div className="flex flex-col gap-4 justify-center items-center bg-gray-700/30 pt-8 pl-15 pr-15 pb-8 rounded-2xl">
                <h1 className="text-2xl p-2">Email Verification</h1>
                <p>{message}</p>
            </div>
        </div>
    )


}
