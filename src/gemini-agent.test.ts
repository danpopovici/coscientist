import { describe, it, expect } from "vitest";
import { AIAgent } from "@aigne/core";
import { GeminiChatModel } from "@aigne/gemini";
import { createGeminiModel, createGreetingAgent } from "./gemini-agent.js";

describe("Gemini Agent", () => {
  describe("createGeminiModel", () => {
    it("should create a GeminiChatModel instance", () => {
      const model = createGeminiModel("test-api-key");
      expect(model).toBeInstanceOf(GeminiChatModel);
    });

    it("should create model with default model name", () => {
      const model = createGeminiModel("test-api-key");
      expect(model.credential.model).toBe("models/gemini-3-flash-preview");
    });

    it("should create model with custom model name", () => {
      const model = createGeminiModel("test-api-key", "gemini-1.5-pro");
      expect(model.credential.model).toBe("gemini-1.5-pro");
    });

    it("should store the API key in credentials", () => {
      const model = createGeminiModel("my-test-key");
      expect(model.credential.apiKey).toBe("my-test-key");
    });
  });

  describe("createGreetingAgent", () => {
    it("should create an AIAgent instance", () => {
      const agent = createGreetingAgent();
      expect(agent).toBeInstanceOf(AIAgent);
    });

    it("should have correct agent name", () => {
      const agent = createGreetingAgent();
      expect(agent.name).toBe("GreetingAgent");
    });

    it("should have message as input key", () => {
      const agent = createGreetingAgent();
      expect(agent.inputKey).toBe("message");
    });

    it("should have message as output key", () => {
      const agent = createGreetingAgent();
      expect(agent.outputKey).toBe("message");
    });

    it("should have instructions defined", () => {
      const agent = createGreetingAgent();
      expect(agent.instructions).toBeDefined();
    });
  });
});
