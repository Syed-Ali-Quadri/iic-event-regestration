import { NextRequest, NextResponse } from "next/server";
import main from "@/config/db";

export async function GET(request: NextRequest) {
    try {
        await main();
        const body = request.body;
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to connect to database" },
            { status: 500 }
        );
    }
}