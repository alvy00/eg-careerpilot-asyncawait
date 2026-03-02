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

    try {
        const modelsToTry = [
            "gemini-3-flash-preview",
            "gemini-2.5-flash",
            "gemini-2.5-flash-lite",
        ];

        let res;
        let lastError;

        for (const model of modelsToTry) {
            try {
                console.log(`Trying model: ${model}`);

                res = await ai.models.generateContent({
                    model,
                    contents: prompt,
                });

                console.log(`Success with model: ${model}`);
                break;
            } catch (err: any) {
                lastError = err;

                if (!(err?.status === 429 || err?.error?.code === 429)) {
                    throw err;
                }

                console.log(`Quota hit for ${model}, trying next...`);
            }
        }

        if (!res) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "All AI models are currently rate limited. Please try again later.",
                },
                { status: 429 },
            );
        }

        const rawText = res.text ?? "[]";
        let questions: string[];

        try {
            questions = JSON.parse(rawText);
        } catch {
            questions = [rawText];
        }

        const interview = {
            userId,
            roadmapId: roadmap.id,
            userInput,
            difficulty,
            topic,
            questions,
            createdAt: new Date(),
        };

        await db.collection("interviews").insertOne(interview);

        const interviews = await db.collection("interviews").find({}).toArray();

        return NextResponse.json({
            success: true,
            questions,
            interviews,
            createdAt: new Date().toISOString(),
        });
    } catch (e: any) {
        console.log("Gemini Error:", e);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 },
        );
    }
}
