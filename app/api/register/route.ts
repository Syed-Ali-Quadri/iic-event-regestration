import { NextRequest, NextResponse } from "next/server";
import RegistrationFormDto from "@/dto/registeration-form.dto";
import main from "@/config/db";
import Register from "@/model/register.model";
import generateSlug from "@/lib/generate-slug";
import sendEmail from "@/config/email-service";
import sendEmailByBrevo from "@/config/email-service1";

export async function POST(request: NextRequest) {
    await main();

    const body = await request.json();

    // ── Validate ───────────────────────────────────────────────────────────────
    const { success, error, data } = await RegistrationFormDto.validate(body);

    if (!success) {
        return NextResponse.json(
            { error: error || "Validation failed" },
            { status: 400 }
        );
    }

    // ── Duplicate Check ────────────────────────────────────────────────────────
    // @ts-ignore
    const memberRollnos = data.members.map((m) => m.rollno);

    const checkUser = await Register.findOne({
        $or: [// @ts-ignore
            { email: data.email },
            // @ts-ignore
            { rollno: data.rollno },
            { "members.rollno": { $in: memberRollnos } },
        ],
    });

    if (checkUser) {
        return NextResponse.json(
            { error: "A team with this email or roll number is already registered." },
            { status: 409 }
        );
    }

    // ── Create Record ──────────────────────────────────────────────────────────
    const slug = generateSlug();

    // @ts-ignore
    const register = await Register.create({ ...data, slug });

    if (!register) {
        return NextResponse.json(
            { error: "Failed to register. Please try again." },
            { status: 500 }
        );
    }

    // ── Send Email ─────────────────────────────────────────────────────────────
    const ticketLink = `${process.env.NEXT_PUBLIC_BASE_URL}/events/ticket/${slug}`;

    const emailService =
        process.env.DISABLE_RESEND_SERVICE === "true"
            ? sendEmailByBrevo
            : sendEmail;

            // @ts-ignore
    const emailResult = await emailService(data.email, ticketLink);

    if (!emailResult.success) {
        // @ts-ignore
        console.error("[Email] Failed to send ticket email to:", data.email);
    }

    return NextResponse.json(
        { message: "Team registered successfully! QR ticket sent to the leader's email." },
        { status: 201 }
    );
}