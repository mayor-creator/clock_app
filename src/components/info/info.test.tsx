import { describe, it, expect } from "vitest";
import { Information } from "./info";
import { render } from "@testing-library/react";

describe("Info Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Information />);
    expect(container).toBeInTheDocument();
  });

  it("displays the correct text", () => {
    const { getByText } = render(<Information />);
    expect(getByText("Expected Text")).toBeInTheDocument();
  });
});
