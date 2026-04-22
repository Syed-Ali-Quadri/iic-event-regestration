import { NextRequest, NextResponse } from "next/server";
import main from "@/config/db";

import Register from "@/model/register.model";

export async function POST(request: NextRequest) {
    try {
        await main();

        const { slug } = await request.json();

        if (slug.length < 1 && slug.length < 20) {
            return NextResponse.json(
                { error: "Invalid slug" },
                { status: 400 }
            );
        }

        const existUser = await Register.findOne({ slug });

        if (!existUser) {
            return NextResponse.json(
                { error: "Slug not found" },
                { status: 404 }
            );
        }

        if(existUser.checkedIn) {
            return NextResponse.json(
                { error: "Already checked in" },
                { status: 400 }
            );
        }

        existUser.checkedIn = true;
        existUser.checkedInAt = new Date();

        await existUser.save();

        return NextResponse.json(
            { existUser },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to connect to database" },
            { status: 500 }
        );
    }
}