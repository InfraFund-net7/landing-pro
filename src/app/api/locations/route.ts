import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { getServerUrl } from "@/utils/get-server-url.util";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
    const headers = request.headers;

    try {
        const { data } = await axios.get(
            getServerUrl("locations/countries"),
            {
                headers: {
                    Authorization: headers.get("Authorization") ?? "",
                },
            }
        );

        return NextResponse.json(data, {
            status: 200,
        });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { cause: error.message },
                { status: error.response?.status ?? 500 }
            );
        }

        return NextResponse.json(
            { cause: "Unexpected error" },
            { status: 500 }
        );
    }
}
