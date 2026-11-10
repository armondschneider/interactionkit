import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DocsShell from "./DocsShell";
import ComponentsPage from "../../../app/docs/components/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/docs/components" }));

describe("documentation", () => {
  it("lists components", () => {
    render(<DocsShell><ComponentsPage /></DocsShell>);
    expect(screen.getByRole("link", { name: "All components" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /VideoPlayer.*Custom video controls/ })).toHaveAttribute("href", "/docs/components/video-player");
    expect(screen.getByRole("link", { name: /Button.*quiet primary action/ })).toHaveAttribute("href", "/docs/components/button");
  });

  it("switches the documentation to dark mode", () => {
    const { container } = render(<DocsShell>Content</DocsShell>);
    fireEvent.click(screen.getByRole("button", { name: "Toggle display" }));
    expect(container.firstChild).toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Toggle display" })).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps navigation labels mounted when moving between links", () => {
    render(<DocsShell>Content</DocsShell>);
    const overview = screen.getByRole("link", { name: "Overview" });
    const installation = screen.getByRole("link", { name: "Installation" });
    fireEvent.mouseEnter(overview);
    fireEvent.mouseEnter(installation);
    expect(screen.getByRole("link", { name: "Overview" })).toBe(overview);
    expect(screen.getByRole("link", { name: "Installation" })).toBe(installation);
  });
});
