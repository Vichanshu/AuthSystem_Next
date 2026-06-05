import { NextResponse,NextRequest } from 'next/server'
import { jwtVerify } from 'jose'



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // console.log("middlware ran")

    const token = request.cookies.get("token")?.value
    const path = request.nextUrl.pathname
    // console.log("path: ",path)

    const publicPath= ["/login","/signup"]
    const isPublicPath= publicPath.includes(path)

    let validToken=false
    let username:string | undefined

    if(token){
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!)
            const { payload }=await jwtVerify(token,secret)
            validToken=true;
            username=payload.username as string
        } catch (error) {
            validToken=false;
        }
    }

    if(isPublicPath && validToken){
        return NextResponse.redirect(new URL(`/profile/${username}`, request.url))
    }
    if(!isPublicPath && !validToken){
        return NextResponse.redirect(new URL(`/login`, request.url))
    }

    return NextResponse.next();



}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login","/signup","/profile/:path*"],
}