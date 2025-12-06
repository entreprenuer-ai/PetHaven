import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePetDescription = async (breed: string, type: string, age: string, traits: string): Promise<string> => {
  if (!apiKey) return "API Key not configured. Please add description manually.";

  try {
    const prompt = `Write a compelling, short, and warm sales description (max 100 words) for a ${age} old ${breed} ${type}. 
    Key traits: ${traits}. 
    Target audience: Families looking for a pet. 
    Tone: Emotional and inviting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini Gen Error:", error);
    return "Error generating description. Please try again.";
  }
};

export const chatWithPetAssistant = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  if (!apiKey) return "I'm sorry, my AI brain isn't connected right now.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are a helpful veterinary assistant and pet shop guide for 'PetHaven'. You help users choose pets, answer care questions, and recommend products. Keep answers concise (under 100 words) and friendly. Do not answer questions unrelated to animals or the store.",
      },
      history: history,
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the server right now.";
  }
};
