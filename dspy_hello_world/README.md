# DSPy Hello World

A simple DSPy example demonstrating the core concepts:
- **Signatures**: Define input/output structure
- **Modules**: Encapsulate prompting logic
- **Language Models**: Backend for generation via OpenRouter

## Setup

```bash
cd dspy_hello_world
pip install -r requirements.txt
```

## Run Tests

```bash
pytest test_hello_world.py -v
```

## Run with LLM

Set your OpenRouter API key and run:

```bash
export OPENROUTER_API_KEY=your-key-here
python hello_world.py
```

To use a different model:
```python
from hello_world import HelloWorld, configure_lm

# Use any model available on OpenRouter
configure_lm("anthropic/claude-3-haiku-20240307")

hello = HelloWorld()
greeting = hello(name="World")
print(greeting)
```

## Available Models

OpenRouter supports many models including:
- `openai/gpt-4o-mini` (default)
- `anthropic/claude-3-haiku-20240307`
- `google/gemini-flash-1.5`
- `meta-llama/llama-3-8b-instruct`

See [OpenRouter Models](https://openrouter.ai/models) for the full list.
