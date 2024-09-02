import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
  You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or concept.
  Return in the following JSON format:
  {
    "flashcards": [{
      "front": str,
      "back": str
    }]
  }
`;

export async function POST(req) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

    const data = await req.text();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(`${systemPrompt}\nUser Input:\n${data}`);
        const responseText = result.response.text();

        console.log("Raw response:", responseText);

        // Clean up the response text if necessary
        const cleanedText = responseText.replace(/^```json\n/, '').replace(/```$/, '').trim();

        // Try to parse the cleaned JSON response
        let flashcards;
        try {
            flashcards = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Error parsing JSON response:", parseError);
            return NextResponse.json({ error: "Failed to parse flashcards." }, { status: 500 });
        }

        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json({ error: "Failed to generate flashcards." }, { status: 500 });
    }
}
