# Hello World AIGNE App

A minimal hello world application built with the [AIGNE Framework](https://github.com/AIGNE-io/aigne-framework).

## Prerequisites

- Node.js >= 20.0.0
- npm, yarn, or pnpm
- Google API key (for Gemini features)

## Installation

```bash
npm install
```

## Usage

### Running the Application

```bash
# Development mode (without Gemini)
npm run dev

# With Gemini enabled
GEMINI_API_KEY=your-api-key npm run dev

# Production mode
npm run build
npm start
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
├── src/
│   ├── hello-agent.ts       # Simple HelloAgent (no LLM required)
│   ├── hello-agent.test.ts  # HelloAgent unit tests
│   ├── gemini-agent.ts      # Gemini-powered AI agent
│   ├── gemini-agent.test.ts # Gemini agent unit tests
│   └── index.ts             # Main entry point
├── .env.example             # Environment variables template
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Agents

### HelloAgent (Simple)

A basic AIGNE agent that doesn't require an LLM:

```typescript
import { HelloAgent } from "./hello-agent.js";

const agent = HelloAgent.create();
const result = await agent.process({ name: "Your Name" });
console.log(result.$message.greeting); // "Hello, Your Name!"
```

### GreetingAgent (Gemini-Powered)

An AI agent powered by Google's Gemini model:

```typescript
import { greetWithGemini } from "./gemini-agent.js";

const response = await greetWithGemini("Hello! My name is Alice.");
console.log(response); // AI-generated greeting
```

Or with more control:

```typescript
import { AIGNE } from "@aigne/core";
import { createGeminiModel, createGreetingAgent } from "./gemini-agent.js";

const model = createGeminiModel(process.env.GEMINI_API_KEY);
const agent = createGreetingAgent();
const aigne = new AIGNE({ model });

const result = await aigne.invoke(agent, { message: "Hi there!" });
console.log(result.message);

await aigne.shutdown();
```

## Environment Variables

Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google API key for Gemini |
| `GOOGLE_API_KEY` | Alternative: Google API key |

Get your API key from: https://aistudio.google.com/app/apikey

## License

MIT
