import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import ImageGallery from "./ImageGallery";
import styles from "./styles.module.css";

const images = Array.from({ length: 4 }, (_, index) => ({ src: `image-${index}.jpg`, alt: `Image ${index + 1}` }));

describe("ImageGallery", () => {
  const showModal = HTMLDialogElement.prototype.showModal;
  const close = HTMLDialogElement.prototype.close;
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
    HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  });
  afterAll(() => { HTMLDialogElement.prototype.showModal = showModal; HTMLDialogElement.prototype.close = close; });

  it.each([1, 2, 3, 4])("renders %i independently accessible images", (count) => {
    const { container } = render(<ImageGallery images={images.slice(0, count)} />);
    expect(screen.getAllByRole("button")).toHaveLength(count);
    expect(container.firstChild).toHaveAttribute("data-count", String(count));
    expect(screen.getByRole("button", { name: "Open image: Image 1" })).toHaveClass(styles.galleryTrigger);
  });

  it("opens the selected image and preserves its caption", () => {
    render(<ImageGallery images={[images[0], { ...images[1], caption: "A second view" }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Open image: Image 2" }));
    expect(screen.getByRole("dialog", { name: "Image 2" })).toBeInTheDocument();
    expect(screen.getByText("A second view")).toBeInTheDocument();
  });

  it("accepts explicit dimensions and maximum sizes", () => {
    const { container } = render(<ImageGallery images={[images[0]]} style={{ width: "100%", height: 300, maxWidth: 480, maxHeight: 300 }} />);
    expect(container.firstChild).toHaveStyle({ width: "100%", height: "300px", maxWidth: "480px", maxHeight: "300px" });
  });

  it.each([[[]], [[...images, images[0]]]])("rejects unsupported image counts", (items) => {
    expect(() => render(<ImageGallery images={items} />)).toThrow("ImageGallery requires between 1 and 4 images.");
  });
});
