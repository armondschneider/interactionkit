import { act, screen } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import TransitionComparison from "./TransitionComparison";

describe("transition comparison", () => {
  it("hydrates without a mismatch when reduced motion is preferred", async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<TransitionComparison />);
    document.body.appendChild(container);
    const onRecoverableError = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <TransitionComparison />, { onRecoverableError }); });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Open both" })).toBeInTheDocument();
    await act(async () => root!.unmount());
    container.remove();
  });
});
