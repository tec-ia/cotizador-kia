import TokenJWT from "./lib/util/token"
import { NextResponse } from "next/server"

export default async function middleware(req) {

    const loginToken = req.cookies.get("loginToken")?.value

    const is_valid = await TokenJWT.is_valid(loginToken)

    if (!is_valid) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/dashboard/:path*']
}