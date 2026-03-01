import connectDB from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const db = await connectDB();
    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
}
