import { AIAgent, AIGNE, type Message } from "@aigne/core";
import { GeminiChatModel } from "@aigne/gemini";

/**
 * Input message for the Gemini Agent
 */
export interface GeminiInput extends Message {
  message: string;
}

/**
 * Output message from the Gemini Agent
 */
export interface GeminiOutput extends Message {
  message: string;
}

/**
 * Create a GeminiChatModel instance
 *
 * @param apiKey - Google API key (defaults to GEMINI_API_KEY or GOOGLE_API_KEY env var)
 * @param model - Model name (defaults to gemini-3-flash-preview)
 */
export function createGeminiModel(
  apiKey?: string,
  model: string = "gemini-3-flash-preview"
): GeminiChatModel {
  return new GeminiChatModel({
    apiKey,
    model,
  });
}

/**
 * Create a greeting AIAgent powered by Gemini
 *
 * This agent uses Gemini to generate friendly greeting responses
 */
export function createGreetingAgent(): AIAgent<GeminiInput, GeminiOutput> {
  return AIAgent.from<GeminiInput, GeminiOutput>({
    name: "GreetingAgent",
    instructions: `You are a friendly greeting assistant.
When someone says hello or provides their name, respond with a warm, personalized greeting.
Keep your responses concise and friendly.`,
    inputKey: "message",
    outputKey: "message",
  });
}

/**
 * Run a greeting with the Gemini-powered agent
 *
 * @param message - The message to send to the agent
 * @param apiKey - Optional Google API key
 * @returns The greeting response
 */
export async function greetWithGemini(
  message: string,
  apiKey?: string
): Promise<string> {
  const model = createGeminiModel(apiKey);
  const agent = createGreetingAgent();
  const aigne = new AIGNE({ model });

  try {
    const result = await aigne.invoke(agent, { message });
    return result.message;
  } finally {
    await aigne.shutdown();
  }
}
