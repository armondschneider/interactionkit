import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "../../app/page";
import packageInfo from "../../lib-package.json";

vi.mock("@vercel/analytics/next", () => ({ Analytics: () => null }));
vi.mock("../examples/image/ImageGridModal", () => ({ default: () => null }));
vi.mock("../examples/sheet/SheetExample", () => ({ default: () => null }));
vi.mock("../examples/button/ButtonExample", () => ({ default: () => null }));

describe("homepage package metadata", () => {
  it("links to the npm package page", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: `${packageInfo.name} on npm` });
    expect(link).toHaveAttribute("href", `https://www.npmjs.com/package/${packageInfo.name}`);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("shows installation instructions derived from the package name", () => {
    const { container } = render(<Home />);
    expect(screen.getByText("Install InteractionKit from npm to get started.")).toBeInTheDocument();
    expect(container.querySelector("code")?.textContent).toBe(`pnpm add ${packageInfo.name}`);
  });

  it("links to component documentation and the old interactions", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "See component documentation" })).toHaveAttribute("href", "/docs/components");
    expect(screen.getByRole("link", { name: "Old Interactions" })).toHaveAttribute("href", "/archive");
  });

  it("keeps the video demo off the homepage", () => {
    render(<Home />);
    expect(screen.queryByRole("heading", { name: /video player/i })).not.toBeInTheDocument();
  });
});
