import { GoogleGenAI, Type } from "@google/genai";
import type { TherapyResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const counselingPlanItemSchema = {
    type: Type.OBJECT,
    properties: {
      description: { type: Type.STRING, description: "The detailed step or tip. e.g., 'Clear the cache in Teams'." },
      icon: { type: Type.STRING, description: "A keyword for an icon representing the step. Choose from: 'sync', 'cache', 'restart', 'update', 'setting', 'link', 'calendar', 'collaboration', 'communication', 'check'." }
    },
    required: ["description", "icon"]
};


const responseSchema = {
  type: Type.OBJECT,
  properties: {
    sessionTitle: {
      type: Type.STRING,
      description: "A short, witty, therapy-themed title for the session. e.g., 'The Case of the Crashing Calendar'."
    },
    sentiment: {
      type: Type.STRING,
      description: "The primary emotion detected in the user's vent (e.g., 'Frustration', 'Confusion', 'Anger')."
    },
    involvedTools: {
      type: Type.ARRAY,
      description: "A list of the software tools mentioned in the user's vent (e.g., ['Teams', 'Outlook']).",
      items: { type: Type.STRING }
    },
    therapyDialogue: {
      type: Type.ARRAY,
      description: "A playful, empathetic, and slightly cheeky dialogue between the personified tools. The tools should talk to each other to resolve their 'conflict'.",
      items: {
        type: Type.OBJECT,
        properties: {
          speaker: { type: Type.STRING, description: "The name of the tool that is speaking." },
          line: { type: Type.STRING, description: "The dialogue line for the speaking tool." }
        },
        required: ["speaker", "line"]
      }
    },
    counselingPlan: {
      type: Type.OBJECT,
      description: "A final, actionable plan with practical advice for the user.",
      properties: {
        technicalFixes: {
          type: Type.ARRAY,
          description: "Specific, concrete technical steps the user can take.",
          items: counselingPlanItemSchema
        },
        workflowAdjustments: {
          type: Type.ARRAY,
          description: "Suggestions for changing how the user works with the tools.",
          items: counselingPlanItemSchema
        },
        etiquetteTips: {
          type: Type.ARRAY,
          description: "Tips on best practices or team collaboration.",
          items: counselingPlanItemSchema
        }
      },
      required: ["technicalFixes", "workflowAdjustments", "etiquetteTips"]
    }
  },
  required: ["sessionTitle", "sentiment", "involvedTools", "therapyDialogue", "counselingPlan"]
};

export const getTherapySession = async (vent: string): Promise<TherapyResponse> => {
  try {
    const systemInstruction = `You are TechShrink, a playful, empathetic, and slightly cheeky AI therapist for workplace technology issues. Your tagline is 'Where people and their tools learn to get along'. You personify software tools and facilitate 'therapy sessions' between them to solve user problems. Your tone is witty and helpful.

    Analyze the user's vent below and generate a complete therapy session in the required JSON format. For each item in the counseling plan, you must provide an 'icon' keyword from the predefined list in the schema.
    
    User's vent: "${vent}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemInstruction,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    return parsedData as TherapyResponse;

  } catch (error) {
    console.error("Error generating therapy session:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to get a response from the AI. Reason: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred during AI interaction."));
  }
};