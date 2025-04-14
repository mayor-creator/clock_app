import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Time } from "./time";

describe("Time component", () => {
  it("renders correctly", () => {
    const { container } = render(<Time />);
    expect(container).toBeInTheDocument();
  });

  it("displays the correct time", () => {
    const { getByText } = render(<Time />);
    expect(getByText(/current time/i)).toBeInTheDocument();
  });
});
