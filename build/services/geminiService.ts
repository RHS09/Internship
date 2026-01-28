
import { GoogleGenAI } from "@google/genai";
import { TURFS } from "../data/mockData";
import { Type } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartTurfRecommendation = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is searching for: "${userPrompt}". 
      Based on the following list of turfs, return the most relevant IDs and a short reasoning for each.
      Available Turfs: ${JSON.stringify(TURFS.map(t => ({ id: t.id, name: t.name, sports: t.sports, description: t.description })))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["id", "reason"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    });

    // response.text is a property, not a method
    return JSON.parse(response.text || '{"recommendations": []}');
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { recommendations: [] };
  }
};
