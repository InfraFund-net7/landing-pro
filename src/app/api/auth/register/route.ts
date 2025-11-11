import serverAxios from "@/utils/server-axios";
import { NextResponse } from "next/server";
import { z } from "zod";

const RegisterSchema = z.object({
    role: z.string().optional(),
    type: z.string().optional(),
    wallet_address: z.string().min(1),
    signature: z.string().min(1),
    message: z.string().min(1),
    confirm_tos: z.boolean().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z.string().optional(),
    email: z.string().email().optional(),
    contact_fullname: z.string().optional(),
    company_name: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = RegisterSchema.parse(body);

        const resp = await serverAxios.post("/auth/register", parsed);

        return NextResponse.json(resp.data, { status: resp.status || 200 });
    } catch (err: any) {
        if (err?.name === "ZodError") {
            return NextResponse.json({ message: err.errors }, { status: 400 });
        }
        console.error("Register error:", err);
        return NextResponse.json(
            { message: err.response?.data?.message || err.message || "Server Error" },
            { status: err.response?.status || 500 }
        );
    }
}