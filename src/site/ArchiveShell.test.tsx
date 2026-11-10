import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArchiveShell from "./ArchiveShell";
import packageInfo from "../../lib-package.json";

describe("archive layout", () => {
  it("provides the shared site navigation and archive link", () => {
    render(<ArchiveShell><h1>Example</h1></ArchiveShell>);
    expect(screen.getByRole("heading", { name: "Example" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: `${packageInfo.name} on npm` })).toHaveAttribute("href", `https://www.npmjs.com/package/${packageInfo.name}`);
    expect(screen.getByRole("link", { name: "Old Interactions" })).toHaveAttribute("href", "/archive");
  });

  it("toggles the dark appearance", () => {
    const { container } = render(<ArchiveShell>Example</ArchiveShell>);
    fireEvent.click(screen.getByRole("button", { name: "Toggle display" }));
    expect(container.firstChild).toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Toggle display" })).toHaveAttribute("aria-pressed", "true");
  });
});
