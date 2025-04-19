import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Information } from "./info";

describe("Information Component", () => {
  it("renders correctly", () => {
    render(<Information />);
    expect(screen.getByText("Current timezone")).toBeInTheDocument();
    expect(screen.getByText("Day of the year")).toBeInTheDocument();
    expect(screen.getByText("Day of the week")).toBeInTheDocument();
    expect(screen.getByText("Week number")).toBeInTheDocument();
  });
});
