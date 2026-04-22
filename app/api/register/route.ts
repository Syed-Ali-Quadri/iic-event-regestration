import { NextRequest, NextResponse } from "next/server";
import RegistrationFormDto from "@/dto/registeration-form.dto";
import main from "@/config/db";
import Register from "@/model/register.model";
import generateSlug from "@/lib/generate-slug";
import sendEmail from "@/config/email-service";

export async function POST(request: NextRequest) {
    await main();
    const body = await request.json();
    body.phone = Number(body.phone);

    const { success, error, data } = await RegistrationFormDto.validate(body);

    if (!success) {
        return NextResponse.json(
            { error: error || "Validation failed" },
            { status: 400 }
        );
    }

    // @ts-ignore
    const checkUser = await Register.findOne({ $or: [{ email: data.email }, { phone: data.phone }, { rollno: data.rollno }] });
    if (checkUser) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
        );
    }

    const slug = generateSlug();
    // @ts-ignore
    data.slug = slug;

    // @ts-ignore
    const register = await Register.create(data);
    if (!register) {
        return NextResponse.json(
            { error: "Failed to register" },
            { status: 500 }
        );
    }

    const ticketLink = `${process.env.NEXT_PUBLIC_BASE_URL}/events/ticket/${slug}`;

    // @ts-ignore
    const sendEmailService = await sendEmail(data.email, ticketLink);
    if (!sendEmailService.success) {
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { data, message: "Registered successfully" },
        { status: 200 },
    );
}