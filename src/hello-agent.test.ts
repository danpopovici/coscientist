import { describe, it, expect, beforeEach } from "vitest";
import { HelloAgent, createGreeting } from "./hello-agent.js";

describe("HelloAgent", () => {
  let agent: HelloAgent;

  beforeEach(() => {
    agent = HelloAgent.create();
  });

  describe("constructor", () => {
    it("should create an agent with default name", () => {
      const defaultAgent = new HelloAgent();
      expect(defaultAgent).toBeInstanceOf(HelloAgent);
    });

    it("should create an agent with custom default name", () => {
      const customAgent = new HelloAgent("Custom");
      expect(customAgent).toBeInstanceOf(HelloAgent);
    });
  });

  describe("static create", () => {
    it("should create an agent using factory method", () => {
      const factoryAgent = HelloAgent.create();
      expect(factoryAgent).toBeInstanceOf(HelloAgent);
    });

    it("should create an agent with custom name using factory method", () => {
      const factoryAgent = HelloAgent.create("Factory");
      expect(factoryAgent).toBeInstanceOf(HelloAgent);
    });
  });

  describe("process", () => {
    it("should return greeting with provided name", async () => {
      const result = await agent.process({ name: "Alice" });

      expect(result.$message.greeting).toBe("Hello, Alice!");
      expect(result.$message.timestamp).toBeDefined();
    });

    it("should return greeting with default name when no name provided", async () => {
      const result = await agent.process({});

      expect(result.$message.greeting).toBe("Hello, World!");
      expect(result.$message.timestamp).toBeDefined();
    });

    it("should use custom default name from constructor", async () => {
      const customAgent = new HelloAgent("Custom");
      const result = await customAgent.process({});

      expect(result.$message.greeting).toBe("Hello, Custom!");
    });

    it("should include a valid ISO timestamp", async () => {
      const result = await agent.process({ name: "Test" });
      const timestamp = new Date(result.$message.timestamp);

      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    it("should handle empty string name", async () => {
      const result = await agent.process({ name: "" });

      // Empty string is falsy, so it uses default
      expect(result.$message.greeting).toBe("Hello, World!");
    });
  });
});

describe("createGreeting", () => {
  it("should create greeting with provided name", () => {
    const greeting = createGreeting("Bob");
    expect(greeting).toBe("Hello, Bob!");
  });

  it("should create greeting with default name", () => {
    const greeting = createGreeting();
    expect(greeting).toBe("Hello, World!");
  });

  it("should handle special characters in name", () => {
    const greeting = createGreeting("O'Brien");
    expect(greeting).toBe("Hello, O'Brien!");
  });

  it("should handle unicode names", () => {
    const greeting = createGreeting("世界");
    expect(greeting).toBe("Hello, 世界!");
  });
});
