# DSPy Hello World

A simple DSPy example demonstrating the core concepts:
- **Signatures**: Define input/output structure
- **Modules**: Encapsulate prompting logic
- **Language Models**: Backend for generation

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

Set your API key and run:

```bash
export OPENAI_API_KEY=your-key-here
python hello_world.py
```

To use a different model (e.g., Anthropic):
```python
from hello_world import HelloWorld
import dspy

lm = dspy.LM("anthropic/claude-3-haiku-20240307")
dspy.configure(lm=lm)

hello = HelloWorld()
greeting = hello(name="World")
print(greeting)
```
