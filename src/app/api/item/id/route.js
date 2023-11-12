import ItemService from "@/lib/service/item"

import { NextResponse } from "next/server"

export async function POST(request) {
    const { filter } = await request.json()
    const result = await ItemService.one(filter)
    return NextResponse.json(result, { status: result.status })
}