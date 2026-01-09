import { HelloAgent, createGreeting } from "./hello-agent.js";
import { greetWithGemini, createGreetingAgent, createGeminiModel } from "./gemini-agent.js";

/**
 * Main entry point for the Hello World AIGNE application
 *
 * This demonstrates:
 * 1. A simple custom agent (HelloAgent) that doesn't require an LLM
 * 2. A Gemini-powered AI agent for more sophisticated interactions
 */
async function main(): Promise<void> {
  console.log("Hello World AIGNE App");
  console.log("=====================\n");

  // Part 1: Simple HelloAgent (no LLM required)
  console.log("--- Simple HelloAgent ---");
  const helloAgent = HelloAgent.create();

  const result = await helloAgent.process({ name: "AIGNE User" });
  console.log("Greeting result:", result.$message);

  const defaultResult = await helloAgent.process({});
  console.log("Default greeting:", defaultResult.$message);

  console.log("\nUsing utility function:");
  console.log(createGreeting("World"));

  // Part 2: Gemini-powered Agent (requires GEMINI_API_KEY or GOOGLE_API_KEY)
  console.log("\n--- Gemini-Powered Agent ---");

  const hasApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (hasApiKey) {
    try {
      console.log("Sending greeting to Gemini...");
      const geminiResponse = await greetWithGemini("Hello! My name is Alice.");
      console.log("Gemini response:", geminiResponse);
    } catch (error) {
      console.error("Error calling Gemini:", error);
    }
  } else {
    console.log("Skipping Gemini demo (set GEMINI_API_KEY or GOOGLE_API_KEY to enable)");
    console.log("\nTo run with Gemini:");
    console.log("  GEMINI_API_KEY=your-api-key npm run dev");
  }
}

// Run the main function
main().catch(console.error);

// Export for module usage
export { HelloAgent, createGreeting } from "./hello-agent.js";
export { greetWithGemini, createGreetingAgent, createGeminiModel } from "./gemini-agent.js";
