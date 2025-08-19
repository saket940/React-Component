import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputField from "./InputField";
import { describe, it, expect, vi } from "vitest";

describe("InputField Component", () => {
  it("renders with label and placeholder", () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<InputField helperText="This is a helper" />);
    expect(screen.getByText("This is a helper")).toBeInTheDocument();
  });

  it("shows error message when invalid", () => {
    render(<InputField errorMessage="Invalid input" invalid />);
    expect(screen.getByText("Invalid input")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<InputField onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("disables input when disabled prop is true", () => {
    render(<InputField disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
