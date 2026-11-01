import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { useRef } from "react";
import Sheet from "./Sheet";
import ImageViewer from "../image-viewer/ImageViewer";
import styles from "./styles.module.css";

describe("Sheet", () => {
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

  function openSheet() {
    const trigger = screen.getByRole("button", { name: "Open sheet" });
    trigger.focus();
    fireEvent.click(trigger);
    return { trigger, dialog: screen.getByRole("dialog", { name: "Preferences" }) };
  }

  it("starts closed with a semantic trigger", () => {
    render(<Sheet title="Preferences">Your settings</Sheet>);
    expect(screen.getByRole("button", { name: "Open sheet" })).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens with an accessible title, description, content, and close focus", () => {
    render(<Sheet title="Preferences" description="Choose your settings">Your settings</Sheet>);
    const { trigger, dialog } = openSheet();
    expect(dialog).toHaveAccessibleDescription("Choose your settings");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Your settings")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close sheet" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes, restores focus, and releases scroll locking after the exit", async () => {
    const previous = document.body.style.overflow;
    render(<Sheet title="Preferences" />);
    const { trigger, dialog } = openSheet();
    fireEvent.click(screen.getByRole("button", { name: "Close sheet" }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe(previous);
  });

  it("dismisses on native Escape cancellation", async () => {
    render(<Sheet title="Preferences" />);
    const { dialog } = openSheet();
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
  });

  it("dismisses on the backdrop", async () => {
    render(<Sheet title="Preferences" />);
    const { dialog } = openSheet();
    fireEvent.click(dialog.querySelector('[aria-hidden="true"]')!);
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
  });

  it("can disable accidental dismissal without disabling the close button", async () => {
    const { container } = render(<Sheet title="Preferences" dismissible={false} />);
    const { dialog } = openSheet();
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    fireEvent.click(dialog.querySelector('[aria-hidden="true"]')!);
    expect(dialog).toHaveAttribute("open");
    expect(container.querySelector('[data-slot="sheet-handle"]')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close sheet" }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
  });

  it("keeps controlled state in the parent's hands", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<Sheet title="Preferences" open={false} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(<Sheet title="Preferences" open onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Close sheet" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
  });

  it("supports an initial focus target inside the content", () => {
    function FormSheet() {
      const inputRef = useRef<HTMLInputElement>(null);
      return <Sheet title="Preferences" defaultOpen initialFocusRef={inputRef}><input ref={inputRef} aria-label="Name" /></Sheet>;
    }
    render(<FormSheet />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
  });

  it("restores an external opener when no built-in trigger is rendered", async () => {
    const { rerender } = render(<><button>External opener</button><Sheet title="Preferences" trigger={null} open={false} /></>);
    const opener = screen.getByRole("button", { name: "External opener" });
    opener.focus();
    rerender(<><button>External opener</button><Sheet title="Preferences" trigger={null} open /></>);
    const dialog = screen.getByRole("dialog");
    rerender(<><button>External opener</button><Sheet title="Preferences" trigger={null} open={false} /></>);
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    expect(opener).toHaveFocus();
  });

  it("puts scrolling content and the footer in separate regions", () => {
    const { container } = render(<Sheet title="Preferences" defaultOpen footer={<button>Save</button>}>Scrollable content</Sheet>);
    const body = container.querySelector('[data-slot="sheet-body"]')!;
    expect(body).toHaveClass(styles.body);
    expect(within(body as HTMLElement).queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("can disable dragging while keeping the other dismissal paths", () => {
    const { container } = render(<Sheet title="Preferences" defaultOpen draggable={false} />);
    expect(container.querySelector('[data-slot="sheet-handle"]')).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close sheet" })).toBeInTheDocument();
  });

  it("shares scroll locks correctly with an image viewer opened inside it", async () => {
    const overflow = document.body.style.overflow;
    render(<Sheet title="Preferences" defaultOpen><ImageViewer src="photo.jpg" alt="A photo" /></Sheet>);
    fireEvent.click(screen.getByRole("button", { name: "Open image: A photo" }));
    fireEvent.click(screen.getByRole("button", { name: "Close image" }));
    await waitFor(() => expect(screen.getAllByRole("dialog")).toHaveLength(1));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Close sheet" }));
    await waitFor(() => expect(document.body.style.overflow).toBe(overflow));
  });

  it("cleans up native modal state and host styles when unmounted", () => {
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const { unmount } = render(<Sheet title="Preferences" defaultOpen />);
    unmount();
    expect(document.body.style.overflow).toBe(overflow);
    expect(document.body.style.paddingRight).toBe(padding);
  });

  it("only closes the top modal when Escape is used on a nested viewer", async () => {
    render(<Sheet title="Preferences" defaultOpen><ImageViewer src="photo.jpg" alt="A photo" /></Sheet>);
    fireEvent.click(screen.getByRole("button", { name: "Open image: A photo" }));
    const viewer = screen.getByRole("dialog", { name: "A photo" });
    fireEvent(viewer, new Event("cancel", { cancelable: true, bubbles: true }));
    await waitFor(() => expect(viewer).not.toHaveAttribute("open"));
    expect(screen.getByRole("dialog", { name: "Preferences" })).toHaveAttribute("open");
    expect(document.body.style.overflow).toBe("hidden");
  });
});
