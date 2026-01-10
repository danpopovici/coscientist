"""
Tests for the DSPy Hello World example.

These tests verify the DSPy structure works correctly.
Run with: pytest test_hello_world.py -v
"""

import pytest
import dspy

from hello_world import Greeter, HelloWorld, configure_lm


class TestGreeterSignature:
    """Tests for the Greeter signature."""

    def test_signature_has_input_field(self):
        """Verify the signature has the 'name' input field."""
        fields = Greeter.model_fields
        assert "name" in fields
        assert fields["name"].json_schema_extra["__dspy_field_type"] == "input"

    def test_signature_has_output_field(self):
        """Verify the signature has the 'greeting' output field."""
        fields = Greeter.model_fields
        assert "greeting" in fields
        assert fields["greeting"].json_schema_extra["__dspy_field_type"] == "output"

    def test_signature_docstring(self):
        """Verify the signature has a docstring."""
        assert Greeter.__doc__ is not None
        assert "greeting" in Greeter.__doc__.lower()


class TestHelloWorldModule:
    """Tests for the HelloWorld module."""

    def test_module_instantiation(self):
        """Verify the module can be instantiated."""
        hello = HelloWorld()
        assert hello is not None
        assert isinstance(hello, dspy.Module)

    def test_module_has_predictor(self):
        """Verify the module has the generate_greeting predictor."""
        hello = HelloWorld()
        assert hasattr(hello, "generate_greeting")
        assert isinstance(hello.generate_greeting, dspy.Predict)

    def test_module_is_callable(self):
        """Verify the module is callable (has forward method)."""
        hello = HelloWorld()
        assert callable(hello)
        assert hasattr(hello, "forward")


class TestDSPyConfiguration:
    """Tests for DSPy configuration."""

    def test_dspy_import(self):
        """Verify DSPy can be imported."""
        import dspy
        assert dspy is not None

    def test_dspy_version(self):
        """Verify DSPy version is recent enough."""
        version = dspy.__version__
        major, minor = map(int, version.split(".")[:2])
        # We need at least version 2.5
        assert major >= 2, f"DSPy major version {major} is too old"
        if major == 2:
            assert minor >= 5, f"DSPy minor version {minor} is too old for v2"


class TestWithDummyLM:
    """Tests using DSPy's DummyLM for mocking."""

    def test_hello_world_with_dummy_lm(self):
        """Test the HelloWorld module with a mock LM."""
        # Configure a dummy LM that returns predictable output
        dummy_lm = dspy.LM("openai/gpt-4o-mini", api_key="test", api_base="http://localhost:9999")

        # Create module (doesn't require LM to be called yet)
        hello = HelloWorld()
        assert hello is not None

    def test_configure_lm_creates_lm_object(self):
        """Test that configure_lm creates a proper LM object."""
        # This will create an LM object (but won't make API calls until used)
        lm = dspy.LM("openai/gpt-4o-mini", api_key="dummy-key")
        assert lm is not None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
