import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DocumentationCodeBlock from "./DocumentationCodeBlock";

describe("DocumentationCodeBlock", () => {
  const writeText = vi.fn();
  const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

  beforeEach(() => {
    writeText.mockReset().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  });

  afterEach(() => {
    if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
    else Reflect.deleteProperty(navigator, "clipboard");
  });

  it("shows the filename and code", () => {
    const { container } = render(<DocumentationCodeBlock title="example.tsx" code="const app = true;" />);
    expect(screen.getByText("example.tsx")).toBeInTheDocument();
    expect(container.querySelector("code")?.textContent).toBe("const app = true;");
    expect(screen.getByText("const")).toHaveClass("text-violet-700", "dark:text-violet-400");
    expect(screen.getByText("true")).toHaveClass("text-amber-700", "dark:text-amber-300");
  });

  it("highlights JSX and strings while preserving whitespace and copy content", () => {
    const code = 'import { Sheet } from "intkit";\n\n<Sheet title="Hello" />';
    const { container } = render(<DocumentationCodeBlock title="example.tsx" code={code} />);
    expect(container.querySelector("code")?.textContent).toBe(code);
    expect(screen.getByText('"intkit"')).toHaveClass("text-emerald-700", "dark:text-emerald-400");
    expect(screen.getAllByText("Sheet")[0]).toHaveClass("text-blue-700", "dark:text-blue-400");
  });

  it("copies the exact code and announces success", async () => {
    render(<DocumentationCodeBlock title="terminal" code="pnpm add example" terminal />);
    fireEvent.click(screen.getByRole("button", { name: "Copy terminal" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copied to clipboard"));
    expect(writeText).toHaveBeenCalledWith("pnpm add example");
  });

  it("announces clipboard failures without claiming success", async () => {
    writeText.mockRejectedValue(new Error("Not permitted"));
    render(<DocumentationCodeBlock title="terminal" code="pnpm add example" terminal />);
    fireEvent.click(screen.getByRole("button", { name: "Copy terminal" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Could not copy"));
    expect(screen.getByRole("button", { name: "Copy terminal" })).toBeInTheDocument();
  });
});
