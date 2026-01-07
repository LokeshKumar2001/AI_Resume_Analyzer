import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize the client
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeResume = async (resumeText, jobDescription = "") => {
  try {
    const systemInstruction = `
      You are an expert ATS (Applicant Tracking System) reviewer. 
      Analyze the provided Resume ${
        jobDescription
          ? "against the Job Description"
          : "based on industry standards"
      }.
      
      CRITICAL RULES:
      1. CATEGORIZATION: If experience < 2 years, use "Early Career" logic. If > 2 years, use "Professional" logic.
      2. Return ONLY a valid JSON object. No prose, no backticks.
      
      SCHEMA:
      {
        "score_metrics": { "ats_score": 0, "keyword_match": "string" },
        "critical_fixes": [{ "type": "string", "issue": "string", "description": "string", "priority": "High|Medium|Low" }],
        "keyword_analysis": { "found": [], "missing": [] },
        "fresher_logic": { "academic_strength": "string", "project_score": "string" }
      }`;

    // 2. NEW SDK SYNTAX: client.models.generateContent
    const result = await client.models.generateContent({
      model: "gemini-2.5-flash", // Use a supported model name for this SDK //gemini-2.0-flash
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemInstruction}\n\nResume: ${resumeText}\n\nJD: ${jobDescription}`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    /*const result = await client.models.generateContent({
      // Use exactly this string
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\nResume: ${resumeText}` }],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });*/
    // 3. NEW SDK SYNTAX: result.text is a property, not a function
    const responseText = result.text;

    return JSON.parse(responseText);
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};
