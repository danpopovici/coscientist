import { HelloAgent, createGreeting } from "./hello-agent.js";

/**
 * Main entry point for the Hello World AIGNE application
 *
 * This demonstrates how to use the HelloAgent directly without
 * requiring an LLM model configuration.
 */
async function main(): Promise<void> {
  console.log("Hello World AIGNE App");
  console.log("=====================\n");

  // Create the HelloAgent
  const helloAgent = HelloAgent.create();

  // Invoke the agent directly with a name
  const result = await helloAgent.process({ name: "AIGNE User" });
  console.log("Greeting result:", result.$message);

  // Invoke with default name
  const defaultResult = await helloAgent.process({});
  console.log("Default greeting:", defaultResult.$message);

  // Using the utility function
  console.log("\nUsing utility function:");
  console.log(createGreeting("World"));
}

// Run the main function
main().catch(console.error);

// Export for module usage
export { HelloAgent, createGreeting } from "./hello-agent.js";
