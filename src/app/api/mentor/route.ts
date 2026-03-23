import { GoogleGenAI } from "@google/genai"
import connectDB from "@/utils/mongodb"
import { NextRequest, NextResponse } from "next/server"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"]

export async function POST(req: NextRequest) {
  const { messages, userId } = await req.json()
  const db = await connectDB()

  // Fetch last 5 roadmaps for rich context
  let roadmapContext = ""
  try {
    const query = userId ? { userId } : {}
    const roadmaps = await db.collection("roadmaps").find(query).sort({ _id: -1 }).limit(5).toArray()
    if (roadmaps.length) {
      roadmapContext = roadmaps.map((r: any) => {
        const rm = r.roadmap
        const phases = (rm?.phases ?? []).map((p: any) =>
          `  Phase ${p.phase_number}: ${p.phase_title} (${p.duration_weeks} weeks)`
        ).join("\n")
        return `Roadmap: ${rm?.skill ?? "Unknown"} | Level: ${rm?.user_profile?.current_level ?? ""} | ${rm?.user_profile?.total_weeks ?? ""} weeks\n${phases}`
      }).join("\n\n")
    }
  } catch {}

  // Persist user messages to DB
  try {
    if (userId) {
      const lastUserMsg = messages[messages.length - 1]
      if (lastUserMsg?.role === "user") {
        await db.collection("chat_history").insertOne({
          userId,
          role: "user",
          content: lastUserMsg.content,
          createdAt: new Date(),
        })
      }
    }
  } catch {}

  const systemPrompt = `You are CareerPilot AI Mentor — an expert career and learning assistant.
${roadmapContext ? `The user has these personalized learning roadmaps:\n${roadmapContext}\n\nReference these roadmaps when answering questions about their learning plan.` : ""}
Be concise, helpful, and encouraging. Do NOT use markdown formatting like ** or ## in your responses. Write in plain text only.`

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Understood! I'm ready to help." }] },
    ...messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  ]

  let reply = "I'm currently unavailable. Please try again shortly."

  for (const model of MODELS) {
    try {
      const result = await ai.models.generateContent({ model, contents })
      reply = result.text ?? ""
      break
    } catch (err: any) {
      const isQuota = err?.status === 429 || err?.error?.code === 429
      if (!isQuota) break
    }
  }

  // Persist AI reply to DB
  try {
    if (userId) {
      await db.collection("chat_history").insertOne({
        userId,
        role: "assistant",
        content: reply,
        createdAt: new Date(),
      })
    }
  } catch {}

  return NextResponse.json({ reply })
}

// GET: last 5 roadmaps + last 30 chat messages
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId")
  const db = await connectDB()
  const query = userId ? { userId } : {}

  const [roadmaps, history] = await Promise.all([
    db.collection("roadmaps").find(query).sort({ _id: -1 }).limit(5).toArray(),
    userId
      ? db.collection("chat_history").find({ userId }).sort({ createdAt: 1 }).limit(30).toArray()
      : Promise.resolve([]),
  ])

  return NextResponse.json({ roadmaps, history })
}
