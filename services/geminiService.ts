import { GoogleGenAI, Type } from "@google/genai";
import { AppConcept } from "../types";

// Initialize Gemini Client
// Note: In a production environment, you should proxy these requests through a backend
// to protect your API key. For this demo, we access process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAppConcept = async (businessType: string): Promise<AppConcept> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are a senior product strategist for IntelFlow, an agency that builds apps for small businesses.
    A client runs a "${businessType}".
    
    Generate a brief concept for a mobile app that would help this specific business grow.
    IMPORTANT: Provide the response in Russian language.
    
    Return JSON with:
    1. "tagline": A catchy 3-5 word tagline for the app (in Russian).
    2. "features": A list of 3 specific, high-impact features (e.g., "QR-коды лояльности", "Запись в один клик") (in Russian).
    3. "estimatedImpact": A 1-sentence estimated business impact (e.g., "Может увеличить повторные визиты на 20%") (in Russian).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedImpact: { type: Type.STRING }
          },
          required: ["tagline", "features", "estimatedImpact"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AppConcept;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of error to ensure UI doesn't break
    return {
      tagline: "Современные решения для вашего бизнеса",
      features: ["Онлайн-запись", "Программа лояльности", "Push-уведомления"],
      estimatedImpact: "Оптимизация процессов и удержание клиентов."
    };
  }
};