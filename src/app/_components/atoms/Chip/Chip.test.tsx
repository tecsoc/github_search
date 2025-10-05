
import { render, screen } from "@testing-library/react";
import { Chip } from "./Chip";

describe("Chip component", () => {
  it("TypeScriptが表示される", () => {
    render(<Chip name="TypeScript" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("JavaScriptが表示される", () => {
    render(<Chip name="JavaScript" />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });
});