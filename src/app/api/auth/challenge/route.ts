import serverAxios from "@/utils/server-axios";
import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
  wallet_address: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.parse(body);

    const resp = await serverAxios.post("/auth/challenge", {
      wallet_address: parsed.wallet_address,
    });

    return NextResponse.json(resp.data, { status: resp.status || 200 });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json({ message: err.errors }, { status: 400 });
    }
    console.error("Challenge error:", err);
    return NextResponse.json(
      { message: err.response?.data?.message || err.message || "Server Error" },
      { status: err.response?.status || 500 }
    );
  }
}