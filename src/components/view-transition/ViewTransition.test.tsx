import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ViewTransition from "./ViewTransition";

describe("ViewTransition", () => {
  it("opens, closes with Escape, and restores focus", () => {
    render(<ViewTransition trigger="Actions"><button type="button">Option</button></ViewTransition>);
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger.closest("[data-slot='view-transition']")).toHaveAttribute("tabindex", "-1");
    expect(screen.queryByRole("button", { name: "Option" })).not.toBeInTheDocument();
    fireEvent.click(trigger);
    const option = screen.getByRole("button", { name: "Option" });
    option.focus();
    fireEvent.keyDown(option, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(option.closest("[inert]")).not.toBeNull();
  });

  it("hides closed content before hydration and leaves initially open content visible", () => {
    const closed = renderToString(<ViewTransition trigger="Actions"><button>Option</button></ViewTransition>);
    expect(closed).toContain("data-initial-hidden");
    const open = renderToString(<ViewTransition trigger="Actions" defaultOpen><button>Option</button></ViewTransition>);
    expect(open).not.toContain("data-initial-hidden");
  });

  it.each([["sm", 200], ["md", 240], ["lg", 320]] as const)("uses the %s expanded-width preset", (size, width) => {
    const html = renderToString(<ViewTransition trigger="Actions" size={size} defaultOpen>Content</ViewTransition>);
    expect(html).toContain(`width:${width}px`);
  });

  it("sizes the closed trigger automatically and lets explicit widths override presets", () => {
    const closed = renderToString(<ViewTransition trigger="A longer label">Content</ViewTransition>);
    expect(closed).toContain("width:auto");
    const customClosed = renderToString(<ViewTransition trigger="Actions" closedWidth={180}>Content</ViewTransition>);
    expect(customClosed).toContain("width:180px");
    const customOpen = renderToString(<ViewTransition trigger="Actions" size="sm" openWidth={360} defaultOpen>Content</ViewTransition>);
    expect(customOpen).toContain("width:360px");
  });

  it("makes overflowing content keyboard-focusable and removes it when closed", () => {
    render(<ViewTransition trigger="Details" defaultOpen><p>Long content</p></ViewTransition>);
    const trigger = screen.getByRole("button", { name: "Details" });
    const content = document.getElementById(trigger.getAttribute("aria-controls")!)!;
    Object.defineProperty(content, "scrollHeight", { configurable: true, value: 600 });
    Object.defineProperty(content, "clientHeight", { configurable: true, value: 200 });
    act(() => window.dispatchEvent(new Event("resize")));
    expect(screen.getByRole("region", { name: "Details" })).toHaveAttribute("tabindex", "0");
    content.focus();
    fireEvent.keyDown(content, { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(content).toHaveAttribute("tabindex", "-1");
  });

  it("supports controlled state and the close callback", () => {
    const onChange = vi.fn();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return <ViewTransition trigger="Actions" open={open} onOpenChange={(value) => { onChange(value); setOpen(value); }}>{({ close }) => <button onClick={close}>Done</button>}</ViewTransition>;
    }
    render(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    const done = screen.getByRole("button", { name: "Done" });
    done.focus();
    fireEvent.click(done);
    expect(onChange.mock.calls).toEqual([[true], [false]]);
    expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
  });

  it("dismisses outside without dismissing inside and supports opting out", () => {
    const { rerender } = render(<><ViewTransition trigger="Actions" defaultOpen><button>Inside</button></ViewTransition><button>Outside</button></>);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Inside" }));
    expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute("aria-expanded", "false");
    rerender(<><ViewTransition trigger="Actions" open closeOnOutsideClick={false}><button>Inside</button></ViewTransition><button>Outside</button></>);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute("aria-expanded", "true");
  });
});
