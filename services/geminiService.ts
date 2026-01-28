
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askHetAI = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful AI assistant representing Het Ramoliya. 
      Het's profile: Data Analyst & Python DevOps. 
      Education: GTU (Sigma Institute), GPA 7.7. 
      Hobbies: Cricket, Trekking, Exploring Cars, Tech. 
      Key Skills: Python, Power BI, Tableau, Azure.
      Recent Projects: AI for Manufacturing (Intel/GTU), Microsoft Data & AI Internship.
      
      User's Question: ${question}
      
      Answer as if you are Het's personal assistant. Keep it professional yet energetic and reflective of his hobbies.`,
    });
    return response.text || "I'm sorry, I couldn't process that. Can you try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Het is currently trekking in a low-signal area. Please leave a message or try again later!";
  }
};
