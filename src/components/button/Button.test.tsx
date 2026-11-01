import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";
import styles from "./styles.module.css";

describe("Button", () => {
  it("renders a native button with its scoped component and size styles", () => {
    render(<Button>Continue</Button>);
    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(styles.button, styles.md);
  });

  it("calls the action on repeated activation", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("does not submit a form unless explicitly requested", () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    const { rerender } = render(<form onSubmit={onSubmit}><Button>Save</Button></form>);
    fireEvent.click(screen.getByRole("button"));
    expect(onSubmit).not.toHaveBeenCalled();
    rerender(<form onSubmit={onSubmit}><Button type="submit">Save</Button></form>);
    fireEvent.click(screen.getByRole("button"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("uses native disabled behavior", () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Unavailable</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps focus and the original label while loading, without activating or submitting", () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((event) => event.preventDefault());
    const { rerender } = render(<form onSubmit={onSubmit}><Button type="submit" onClick={onClick}>Save changes</Button></form>);
    const button = screen.getByRole("button", { name: "Save changes" });
    button.focus();
    rerender(<form onSubmit={onSubmit}><Button type="submit" loading onClick={onClick}>Save changes</Button></form>);
    expect(button).toHaveFocus();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.firstChild).toHaveClass(styles.hiddenLabel);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("honors aria-disabled even without the disabled attribute", () => {
    const onClick = vi.fn();
    render(<Button aria-disabled="true" onClick={onClick}>Continue</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not treat aria-disabled=false as disabled", () => {
    const onClick = vi.fn();
    render(<Button aria-disabled="false" onClick={onClick}>Continue</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("forwards refs and native attributes", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} name="action" value="save" form="preferences" className="custom-button" aria-controls="details">Save</Button>);
    const button = screen.getByRole("button");
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("name", "action");
    expect(button).toHaveAttribute("value", "save");
    expect(button).toHaveAttribute("form", "preferences");
    expect(button).toHaveAttribute("aria-controls", "details");
    expect(button).toHaveClass("custom-button");
  });

  it("supports compact and accessible icon-only sizing", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass(styles.sm);
    rerender(<Button size="icon" aria-label="Add item"><span aria-hidden="true">+</span></Button>);
    expect(screen.getByRole("button", { name: "Add item" })).toHaveClass(styles.icon);
  });

  it("renders a styled decorative loading indicator", () => {
    const { container } = render(<Button loading>Continue</Button>);
    expect(container.querySelector("svg")).toHaveClass(styles.spinner);
    expect(container.querySelector('span[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeVisible();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute("aria-busy", "true");
  });

  it("keeps icon-only loading buttons compact", () => {
    render(<Button size="icon" loading aria-label="Save"><span aria-hidden="true">+</span></Button>);
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-busy", "true");
  });
});
