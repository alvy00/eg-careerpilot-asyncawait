import connectDB from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await connectDB();
  const activities = await db.collection("activities").find({}).toArray();

  return NextResponse.json(activities);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const { title, description, status } = await req.json();

  const result = await db.collection("activities").insertOne({
    title,
    description,
    status,
  });

  return NextResponse.json({
    message: "Activity created",
    id: result.insertedId,
  });
}