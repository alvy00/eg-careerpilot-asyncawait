import connectDB from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Get all users or a specific user by email
export async function GET(req: NextRequest) {
  try {
    const db = await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      const user = await db.collection("users").findOne({ email });
      return NextResponse.json(user);
    }

    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// new user creation for signup
export async function POST(req: NextRequest) {
  try {
    const db = await connectDB();
    const body = await req.json();

    const existingUser = await db
      .collection("users")
      .findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 },
      );
    }

    const result = await db.collection("users").insertOne({
      ...body,
      createdAt: new Date(),
      role: body.role || "user",
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

//  (Upsert logic) google login
export async function PUT(req: NextRequest) {
  try {
    const db = await connectDB();
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const filter = { email: body.email };
    const options = { upsert: true }; // if email matches then update otherwise create new
    const updateDoc = {
      $set: {
        name: body.name,
        photo: body.photo,
        userId: body.uid,
      },
      $setOnInsert: {
        role: "user",
        createdAt: new Date(),
      },
    };

    const result = await db
      .collection("users")
      .updateOne(filter, updateDoc, options);

    return NextResponse.json({
      success: true,
      message: "User synced successfully",
      result,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to sync user data" },
      { status: 500 },
    );
  }
}
