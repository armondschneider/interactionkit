import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ViewTransitionPage from "../../../app/view-transition/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/view-transition" }));

describe("View Transition blog", () => {
  it("explains the package sizing options and links to the API", () => {
    render(<ViewTransitionPage />);
    expect(screen.getByRole("heading", { name: "Sizing for your content" })).toBeInTheDocument();
    expect(screen.getByText('size="sm"')).toBeInTheDocument();
    expect(screen.getByText('size="lg"')).toBeInTheDocument();
    expect(screen.getByText(/image card, drag handle, and inline note editor are blog experiments/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the component API" })).toHaveAttribute("href", "/docs/components/view-transition");
  });

  it("links early design and accessibility references to the footnotes", () => {
    render(<ViewTransitionPage />);
    expect(screen.getByRole("link", { name: /show the connection between a new surface/ })).toHaveAttribute("href", "#source-1");
    expect(screen.getByRole("link", { name: /without distracting from the task/ })).toHaveAttribute("href", "#source-2");
    expect(screen.getByRole("link", { name: /non-modal disclosure pattern/ })).toHaveAttribute("href", "#source-3");
    expect(screen.getByRole("link", { name: "Disclosure pattern" })).toHaveAttribute("href", "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/");
  });

});
