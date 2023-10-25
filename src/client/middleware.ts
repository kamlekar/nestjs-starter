import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// You can define the private routes in the below array
const ProtectedRoutes = ["/orders", "/profile"]

export function middleware(request: NextRequest) {
    const requestedRoute = request.nextUrl.pathname
    
    // If the user is not requesting a private route, then no interception
    if(!ProtectedRoutes.includes(requestedRoute)) return NextResponse.next()

    // Check whether the user has logged in
    const session = request.cookies.get("connect.sid")
    if(!session) return NextResponse.redirect(request.nextUrl.origin + "/auth/login")

    return NextResponse.next()
}