// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyMessage } from "ethers"; // ✅ ethers v6 — دقیقاً همین رو می‌خوایم

// Schema ولیدیشن داده‌های ورودی
const LoginSchema = z.object({
    wallet_address: z.string().startsWith("0x").length(42, "آدرس والیت نامعتبر است"),
    message: z.string().min(1, "پیام چالش الزامی است"),
    signature: z.string().startsWith("0x").min(130, "امضای نامعتبر است"), // حداقل طول یک امضای معتبر
});

export async function POST(req: Request) {
    try {
        // 1️⃣ دریافت و پارس بدنه درخواست
        const body = await req.json();
        const parsed = LoginSchema.parse(body);

        const { wallet_address, message, signature } = parsed;

        // 2️⃣ اعتبارسنجی امضا — کلید اصلی!
        // 🔑 با استفاده از ethers.verifyMessage (که دقیقاً با viem.signMessage سازگاره)
        let recoveredAddress: string;
        try {
            recoveredAddress = verifyMessage(message, signature);
        } catch (err) {
            console.error("❌ Failed to verify signature:", err);
            return NextResponse.json(
                { error: "امضای نامعتبر — نمی‌توان آدرس را بازیابی کرد." },
                { status: 401 }
            );
        }

        // 3️⃣ مقایسه آدرس بازیابی‌شده و آدرس ارسالی
        if (recoveredAddress.toLowerCase() !== wallet_address.toLowerCase()) {
            console.warn(
                `⚠️ Address mismatch — recovered: ${recoveredAddress}, expected: ${wallet_address}`
            );
            return NextResponse.json(
                { error: "آدرس والیت با امضای ارائه‌شده مطابقت ندارد." },
                { status: 401 }
            );
        }

        // ✅ 4️⃣ احراز هویت موفق — ایجاد/برگرداندن توکن
        // ⚠️ جایگاه منطق توکن (JWT یا session) بسته به سیستمت متفاوته
        // اینجا یک توکن ساده برای نمایش می‌زنم — تو باید جایگزین کنی

        const mockToken = `mock_jwt_token_for_${wallet_address.slice(0, 8)}`; // ❗ جایگزین کن با توکن واقعی

        // مثال واقعی (با JWT):
        // import { generateJWT } from "@/lib/auth";
        // const token = await generateJWT({ wallet: wallet_address });

        // 5️⃣ پاسخ موفق
        return NextResponse.json(
            {
                success: true,
                message: "احراز هویت با موفقیت انجام شد.",
                token: mockToken,
                // یا access_token برای سازگاری با کلاینت:
                // access_token: mockToken,
            },
            { status: 200 }
        );
    } catch (err: any) {
        // ✅ مدیریت خطاها
        if (err.name === "ZodError") {
            const errors = err.errors.map((e: any) => ({
                path: e.path.join("."),
                message: e.message,
            }));
            return NextResponse.json(
                { error: "داده‌های ورودی نامعتبر", details: errors },
                { status: 400 }
            );
        }

        console.error("🔥 login route error:", err);
        return NextResponse.json(
            { error: err.message || "خطای داخلی سرور" },
            { status: err.status || 500 }
        );
    }
}