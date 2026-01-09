# Hello World AIGNE App

A minimal hello world application built with the [AIGNE Framework](https://github.com/AIGNE-io/aigne-framework).

## Prerequisites

- Node.js >= 20.0.0
- npm, yarn, or pnpm

## Installation

```bash
npm install
```

## Usage

### Running the Application

```bash
# Development mode
npm run dev

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
│   ├── hello-agent.ts      # HelloAgent implementation
│   ├── hello-agent.test.ts # Unit tests
│   └── index.ts            # Main entry point
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## HelloAgent

The `HelloAgent` is a simple AIGNE agent that demonstrates the basic structure of an agent:

```typescript
import { HelloAgent } from "./hello-agent.js";

const agent = HelloAgent.create();
const result = await agent.process({ name: "Your Name" });
console.log(result.$message.greeting); // "Hello, Your Name!"
```

## License

MIT
