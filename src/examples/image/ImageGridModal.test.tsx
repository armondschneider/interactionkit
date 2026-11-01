import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImageGridModal from "./ImageGridModal";
import { imageGridImages } from "./exampleImages";

describe("ImageGridModal", () => {
  it("renders the four image triggers and accepts demo sizing", () => {
    const { container } = render(<ImageGridModal images={imageGridImages} className="!max-w-[250px]" />);
    expect(screen.getAllByRole("button")).toHaveLength(4);
    expect(screen.getByRole("button", { name: "Open image: Coastal photograph" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("!max-w-[250px]");
  });

  it("keeps layout identities unique across galleries", () => {
    const { container } = render(<><ImageGridModal images={imageGridImages} /><ImageGridModal images={imageGridImages} /></>);
    const ids = [...container.querySelectorAll("dialog")].map((dialog) => dialog.id);
    expect(new Set(ids).size).toBe(8);
  });
});
