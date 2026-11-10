import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ComponentPage from "../../../app/docs/components/[slug]/page";

describe("ViewTransition documentation", () => {
  it("documents the release, configuration, and disclosure behavior", async () => {
    render(await ComponentPage({ params: Promise.resolve({ slug: "view-transition" }) }));
    expect(screen.getByText(/Available in/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Controlled state" })).toBeInTheDocument();
    expect(screen.getByText("triggerLabel")).toBeInTheDocument();
    expect(screen.getByText(/children remain mounted/)).toBeInTheDocument();
    expect(screen.getByText(/viewport collisions/)).toBeInTheDocument();
  });
});
