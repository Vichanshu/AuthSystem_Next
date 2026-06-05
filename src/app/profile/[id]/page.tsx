
import User from "@/models/userModel";
import connectToDatabase from "@/dbConfig/connection";
import LogOutButton from "./LogOutButton";



connectToDatabase()

export default async function ProfilePage({params}: { params: Promise<{ id: string }> }){
    const { id } = await params;
    const user = await User.findOne({username:id})
    const verified = user?.isVerified || false;
    return (
        <div className="h-screen justify-center items-center flex">
            <div className="flex flex-col justify-center items-center bg-gray-700/30 rounded-2xl">
                <h1 className="text-2xl p-2">Profile Page for {id}</h1>
            </div>
            {verified && (
                <div className="text-green-500 text-2xl">✓</div>
            )}

            <LogOutButton />

        </div>
    )

}
