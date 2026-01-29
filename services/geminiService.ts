import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRoutine = async (activity: string): Promise<string> => {
  try {
    const prompt = `Create a short, simple 1-hour schedule block for an 8-month-old baby named Riley that starts with the activity: ${activity}. Format it as a simple bulleted list with times (e.g., 0:00 - ${activity}). Keep it concise and practical.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Sorry, I couldn't generate a routine right now.";
  } catch (error) {
    console.error("Gemini API Error (Routine):", error);
    return "Unable to connect to AI service. Please try again.";
  }
};

export const generateStory = async (theme: string): Promise<string> => {
  try {
    const prompt = `Write a very short, soothing bedtime story (max 100 words) for a baby named Riley. The story should be about: ${theme}. Use calming, repetitive language suitable for an infant.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Sorry, I couldn't generate a story right now.";
  } catch (error) {
    console.error("Gemini API Error (Story):", error);
    return "Unable to connect to AI service. Please try again.";
  }
};