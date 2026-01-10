"""
DSPy Hello World Example

This demonstrates the basic concepts of DSPy:
1. Signatures - Define input/output structure
2. Modules - Encapsulate prompting logic
3. Language Models - Backend for generation (via OpenRouter)

To run with an actual LLM:
    export OPENROUTER_API_KEY=your-key-here
    python hello_world.py
"""

import os

import dspy

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"


class Greeter(dspy.Signature):
    """Generate a friendly greeting for a person."""

    name: str = dspy.InputField(desc="The name of the person to greet")
    greeting: str = dspy.OutputField(desc="A warm, friendly greeting")


class HelloWorld(dspy.Module):
    """A simple DSPy module that generates greetings."""

    def __init__(self):
        super().__init__()
        self.generate_greeting = dspy.Predict(Greeter)

    def forward(self, name: str) -> str:
        result = self.generate_greeting(name=name)
        return result.greeting


def configure_lm(model: str = "openai/gpt-4o-mini") -> dspy.LM:
    """Configure the language model for DSPy via OpenRouter.

    Args:
        model: The model identifier (e.g., 'openai/gpt-4o-mini', 'anthropic/claude-3-haiku-20240307')

    Returns:
        Configured language model
    """
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY environment variable is required")

    lm = dspy.LM(
        model=f"openai/{model}",
        api_key=api_key,
        api_base=OPENROUTER_BASE_URL,
    )
    dspy.configure(lm=lm)
    return lm


def main():
    """Run the hello world example."""
    print("DSPy Hello World Example (OpenRouter)")
    print("=" * 40)

    # Configure the language model via OpenRouter
    lm = configure_lm()
    print(f"Configured LM: {lm}")

    # Create the hello world module
    hello = HelloWorld()

    # Generate a greeting
    name = "World"
    print(f"\nGenerating greeting for: {name}")
    greeting = hello(name=name)
    print(f"Result: {greeting}")

    return greeting


if __name__ == "__main__":
    main()
