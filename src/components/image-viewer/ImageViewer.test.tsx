import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import ImageViewer from "./ImageViewer";
import styles from "./styles.module.css";

describe("ImageViewer", () => {
  const showModal = HTMLDialogElement.prototype.showModal;
  const close = HTMLDialogElement.prototype.close;

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
    HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  });
  afterAll(() => {
    HTMLDialogElement.prototype.showModal = showModal;
    HTMLDialogElement.prototype.close = close;
  });

  const props = { src: "full.jpg", alt: "A quiet coastline" };

  function openImage() {
    const trigger = screen.getByRole("button", { name: "Open image: A quiet coastline" });
    trigger.focus();
    fireEvent.click(trigger);
    return { trigger, dialog: screen.getByRole("dialog", { name: props.alt }) };
  }

  it("renders a thumbnail without a visible dialog", () => {
    render(<ImageViewer {...props} thumbnailSrc="small.jpg" />);
    expect(screen.getByAltText(props.alt)).toHaveAttribute("src", "small.jpg");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button")).toHaveClass(styles.trigger);
  });

  it("opens a labelled modal, focuses Close, and locks background scroll", () => {
    render(<ImageViewer {...props} />);
    const { dialog, trigger } = openImage();
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAccessibleDescription(/Drag the image to dismiss/);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Close image" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes after the exit, restores scrolling, and returns focus to its trigger", async () => {
    const previousOverflow = document.body.style.overflow;
    render(<ImageViewer {...props} />);
    const { dialog, trigger } = openImage();
    fireEvent.click(screen.getByRole("button", { name: "Close image" }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it("handles native Escape cancellation and reopens cleanly", async () => {
    render(<ImageViewer {...props} />);
    const { dialog, trigger } = openImage();
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    fireEvent.click(trigger);
    expect(dialog).toHaveAttribute("open");
  });

  it("dismisses from the backdrop", async () => {
    render(<ImageViewer {...props} />);
    const { dialog } = openImage();
    fireEvent.click(dialog.querySelector('[aria-hidden="true"]')!);
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
  });

  it("supports controlled state without opening before the parent accepts it", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<ImageViewer {...props} open={false} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(<ImageViewer {...props} open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close image" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
  });

  it("lets a controlling parent complete the open/close cycle", async () => {
    function ControlledViewer() {
      const [open, setOpen] = useState(false);
      return <ImageViewer {...props} open={open} onOpenChange={setOpen} />;
    }
    render(<ControlledViewer />);
    const { dialog } = openImage();
    fireEvent.click(screen.getByRole("button", { name: "Close image" }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
  });

  it("supports defaultOpen, captions, and custom labels", () => {
    render(<ImageViewer {...props} defaultOpen caption="From a recent trip" openLabel="View photo" closeLabel="Done" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
    expect(screen.getByText("From a recent trip")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Done" })).toHaveFocus();
  });

  it("shows an image error without removing the close action", () => {
    render(<ImageViewer {...props} />);
    openImage();
    fireEvent.error(screen.getAllByAltText(props.alt)[1]);
    expect(screen.getByRole("status")).toHaveTextContent("couldn’t be loaded");
    expect(screen.getByRole("button", { name: "Close image" })).toBeInTheDocument();
  });

  it("retries the image when its source changes while open", () => {
    const { rerender } = render(<ImageViewer {...props} defaultOpen />);
    fireEvent.error(screen.getAllByAltText(props.alt)[1]);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<ImageViewer {...props} src="replacement.jpg" defaultOpen />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getAllByAltText(props.alt)[1]).toHaveAttribute("src", "replacement.jpg");
  });

  it("restores the host body styles when unmounted while open", () => {
    const overflow = document.body.style.overflow;
    const paddingRight = document.body.style.paddingRight;
    const { unmount } = render(<ImageViewer {...props} defaultOpen />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe(overflow);
    expect(document.body.style.paddingRight).toBe(paddingRight);
  });

  it("keeps scrolling locked while another viewer is still open", async () => {
    const overflow = document.body.style.overflow;
    render(<><ImageViewer {...props} defaultOpen /><ImageViewer src="other.jpg" alt="Another image" defaultOpen /></>);
    fireEvent.click(screen.getAllByRole("button", { name: "Close image" })[1]);
    await waitFor(() => expect(screen.getAllByRole("dialog")).toHaveLength(1));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Close image" }));
    await waitFor(() => expect(document.body.style.overflow).toBe(overflow));
  });
});
