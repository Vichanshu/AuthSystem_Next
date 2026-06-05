"use client"
import { useRouter } from "next/navigation";
export default function LogOutButton() {
    const router = useRouter();
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
                fetch("/api/logout", { method: "GET" });
                router.push("/login");
            }}
            >
                Logout
            </button>
    )
}