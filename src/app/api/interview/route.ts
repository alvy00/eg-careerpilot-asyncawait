import connectDB from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const db = await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 },
        );
    }

    const interviews = await db
        .collection("interviews")
        .find({ userId })
        .toArray();

    const roadmapIds = interviews
        .map((i) => i.roadmapId)
        .filter((id) => id !== null && id !== undefined)
        .map((id) => new ObjectId(id));

    const roadmaps = await db
        .collection("roadmaps")
        .find(
            { _id: { $in: roadmapIds } },
            { projection: { "roadmap.skill": 1 } },
        )
        .toArray();

    const fullInterviews = interviews.map((interview) => {
        const matchingRoadmap = roadmaps.find(
            (r) => r._id.toString() === interview.roadmapId?.toString(),
        );

        return {
            ...interview,
            roadmapSkill: matchingRoadmap?.roadmap?.skill,
        };
    });

    //console.log(`Fetched ${fullInterviews.length} interviews for user: ${userId}`);
    return NextResponse.json(fullInterviews);
}
