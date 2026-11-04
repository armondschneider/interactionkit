import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "../../app/page";
import packageInfo from "../../lib-package.json";

vi.mock("@vercel/analytics/next", () => ({ Analytics: () => null }));
vi.mock("../examples/image/ImageGridModal", () => ({ default: () => null }));
vi.mock("../examples/sheet/SheetExample", () => ({ default: () => null }));
vi.mock("../examples/button/ButtonExample", () => ({ default: () => null }));

describe("homepage package metadata", () => {
  it("links the manifest version to the npm package page", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: `${packageInfo.name} ${packageInfo.version} on npm` });
    expect(link).toHaveTextContent(packageInfo.version);
    expect(link).toHaveAttribute("href", `https://www.npmjs.com/package/${packageInfo.name}`);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("explains the staged release and derives the install command from the package name", () => {
    const { container } = render(<Home />);
    expect(screen.getByText(`Version ${packageInfo.version} is awaiting npm approval. The current npm package is a placeholder and does not yet contain the components.`)).toBeInTheDocument();
    expect(container.querySelector("code")?.textContent).toBe(`pnpm add ${packageInfo.name}`);
  });
});
