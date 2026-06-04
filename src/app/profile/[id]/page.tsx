export default async function ProfilePage({params}:any){

    const p= await params
    return (
        <div className="h-screen justify-center items-center flex">
            <div className="flex flex-col justify-center items-center bg-gray-700/30 rounded-2xl">
                <h1 className="text-2xl p-2">Profile Page for {p.id}</h1>
            </div>
        </div>
    )

}