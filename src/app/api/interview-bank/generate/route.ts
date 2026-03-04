import connectDB from "@/utils/mongodb";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
  const db = await connectDB();
  const banks = await db.collection("questionBanks").find({}).toArray();

  return NextResponse.json(banks);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();

  const { userId, userEmail, topic, role, level } =
    await req.json();

  if (!topic || typeof topic !== "string") {
    return NextResponse.json(
      { success: false, message: "Topic is required" },
      { status: 400 }
    );
  }

  const prompt = `
  {
    "instruction_set": {
      "role": "Senior Technical Interview Architect with 20+ years of experience in FAANG-level hiring.",
      "objective": "Generate a COMPLETE structured interview question bank in STRICT JSON format.",
      "constraints": [
        "Provide 10-15 questions",
        "Include at least 2 system design questions if relevant",
        "Answers must be practical, concise, and industry-standard"
      ]
    },
    "candidate_context": {
      "topic": "${topic}",
      "target_role": "${role ?? "Software Engineer"}",
      "difficulty_level": "${level ?? "Beginner→Advanced"}"
    },
    "output_rules": [
      "Output MUST be VALID JSON only.",
      "Do NOT include markdown code blocks.",
      "Do NOT include commentary outside JSON.",
      "Start with '{' and end with '}'."
    ],
    "json_schema": {
      "topic": "string",
      "level": "string",
      "questions": [
        {
          "question": "string",
          "difficulty": "Easy | Medium | Hard",
          "shortAnswer": "string",
          "detailedAnswer": "string",
          "followUps": ["string"],
          "commonMistakes": ["string"],
          "tags": ["string"]
        }
      ]
    }
  }
  `;

  try {
    const modelsToTry = [
      "gemini-3-flash-preview",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
    ];

    let response;
    let lastError;

    for (const model of modelsToTry) {
      try {
        console.log(`Trying model: ${model}`);

        response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        console.log(`Success with model: ${model}`);
        break;
      } catch (err: any) {
        lastError = err;

        const isQuotaError =
          err?.status === 429 ||
          err?.error?.code === 429 ||
          err?.error?.status === "RESOURCE_EXHAUSTED";

        if (!isQuotaError) {
          throw err;
        }

        console.log(`Quota hit for ${model}, trying next...`);
      }
    }

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All AI models are currently rate limited. Please try again later.",
        },
        { status: 429 }
      );
    }

    const text = response.text ?? "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    let questionBank = {};

    if (jsonMatch) {
      try {
        questionBank = JSON.parse(jsonMatch[0]);
      } catch {
        questionBank = {};
      }
    }

    await db.collection("questionBanks").insertOne({
      userId,
      userEmail,
      topic,
      role,
      level,
      questionBank,
      createdAt: new Date(),
    });

    return NextResponse.json({ questionBank });
  } catch (error) {
    console.log("AI Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}