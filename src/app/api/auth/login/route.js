import { NextResponse } from 'next/server'

import UserService from "@/lib/service/user"
import TokenJWT from "@/lib/util/token"

import {
    STATUS_RESPONSE_SUCCESS
} from "@/lib/helper/constants"

export async function POST(request) {

    const { username, password } = await request.json()

    const result = await UserService.login(username, password)

    if (result.status != STATUS_RESPONSE_SUCCESS) {
        return NextResponse.json(result, { status: result.status })
    }

    const token = await TokenJWT.sing(result.data)

    return new Response(result, {
        status: 200,
        headers: { 'Set-Cookie': `${token}` },
    })

}