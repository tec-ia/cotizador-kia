import { NextResponse } from 'next/server'
import TokenJWT from '@/lib/util/token'

export async function GET(request) {

    const loginToken = request.cookies.get("loginToken")?.value

    if (!loginToken) {
        return new Response('No existe el token', {
            status: 200,
        })
    }

    const token = await TokenJWT.remove()

    return new Response('Se ha cerrado la sesión', {
        status: 200,
        headers: { 'Set-Cookie': `${token}` },
    })
}