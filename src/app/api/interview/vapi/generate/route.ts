import connectDB from "@/utils/mongodb";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function GET() {
    return NextResponse.json({ message: "Vapi api is working!" });
}

export async function POST(request: NextRequest) {
    const { userId, roadmap, userInput, difficulty, topic } =
        await request.json();

    const db = await connectDB();

    const qAmount = 3;

    try {
        const prompt = `Prepare questions for a job interview.
                The job experience level is ${difficulty} and ${userInput}.
                The tech stack used in the job is: ${roadmap}.
                The focus between behavioural and technical questions should lean towards: ${topic}.
                The amount of questions required is: ${qAmount}.
                Please return only the questions, without any additional text.
                The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                Return the questions formatted like this:
                ["Question 1", "Question 2", "Question 3"]
                
                Thank you! <3`;

        const res = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `${prompt}`,
        });

        const questions = res.text;

        const interview = {
            userId: userId,
            roadmapId: roadmap.id,
            userInput: userInput,
            difficulty: difficulty,
            topic: topic,
            questions: questions,
        };
        await db.collection("interviews").insertOne(interview, {});

        const interviews = await db.collection("interviews").find({}).toArray();

        return NextResponse.json({
            success: true,
            status: 200,
            questions: questions,
            interviews: interviews,
            createdAt: new Date().toISOString(),
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ status: 500, success: false, e });
    }
}
