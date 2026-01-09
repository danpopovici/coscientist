import { Agent, type Message } from "@aigne/core";

/**
 * Input message for the HelloAgent
 */
export interface HelloInput extends Message {
  name?: string;
}

/**
 * Output message from the HelloAgent
 */
export interface HelloOutput extends Message {
  greeting: string;
  timestamp: string;
}

/**
 * HelloAgent - A simple agent that greets users
 *
 * This agent demonstrates the basic structure of an AIGNE agent
 * by implementing a simple greeting functionality.
 */
export class HelloAgent extends Agent<HelloInput, HelloOutput> {
  private defaultName: string;

  constructor(defaultName: string = "World") {
    super({ name: "HelloAgent" });
    this.defaultName = defaultName;
  }

  /**
   * Process the input and return a greeting
   */
  async process(input: HelloInput): Promise<{ $message: HelloOutput }> {
    const name = input.name || this.defaultName;
    const greeting = `Hello, ${name}!`;
    const timestamp = new Date().toISOString();

    return {
      $message: {
        greeting,
        timestamp,
      },
    };
  }

  /**
   * Factory method to create a HelloAgent instance
   */
  static create(defaultName?: string): HelloAgent {
    return new HelloAgent(defaultName);
  }
}

/**
 * Create a greeting message
 * Utility function for simple use cases
 */
export function createGreeting(name: string = "World"): string {
  return `Hello, ${name}!`;
}
