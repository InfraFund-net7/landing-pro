import axios from "axios"
import { NextResponse, NextRequest } from "next/server"
import { getServerUrl } from "@/utils/get-server-url.util"

export async function POST(request: NextRequest) {
    const payload = await request.json()
    const headers = await request.headers
    return await axios.post(getServerUrl(`waitlists`), payload, {
        headers: {
            Authorization: headers.get("Authorization") ?? "",
            "X-Captcha-Token": headers.get("X-Captcha-Token") ?? "",
        }
    }).then(({ data }) => {
        return NextResponse.json(data)
    }).catch(({ response: { data, status } }) => {
        return NextResponse.json(data, { status: status })
    })
}