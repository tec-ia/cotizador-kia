import { NextResponse } from 'next/server'

import ItemService from "@/lib/service/item"
import ImageService from '@/lib/service/image'

import {
    STATUS_RESPONSE_SUCCESS
} from "@/lib/helper/constants"

export async function GET() {
    let result = await ItemService.get()
    return NextResponse.json(result, { status: result.status })
}

export async function PUT(request) {
    const { filter, newData } = await request.json()
    let result = await ItemService.update(filter, newData)
    return NextResponse.json(result, { status: result.status })
}

export async function DELETE(request) {
    const { filter } = await request.json()
    let result = await ItemService.delete(filter)
    return NextResponse.json(result, { status: result.status })
}

export async function POST(request) {
    const form = await request.formData()
    const file = form.get('file')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const imgResult = ImageService.write(file.name, buffer)

    if (imgResult.status != STATUS_RESPONSE_SUCCESS) {
        return NextResponse.json(imgResult, { status: imgResult.status })
    }

    const newData = {
        warranty: form.get('warranty'),
        year: form.get('year'),
        model: form.get('model'),
        version: form.get('version'),
        cost_price: form.get('cost_price'),
        selling_price: form.get('selling_price'),
        color: form.get('color'),
        description: form.get('description'),
        img_path: imgResult.data
    }

    const itemResult = ItemService.create(newData)

    if (itemResult.status != STATUS_RESPONSE_SUCCESS) {
        return NextResponse.json(itemResult, { status: itemResult.status })
    }

    return NextResponse.json('aHH QUE ONDA NO JALA')
}