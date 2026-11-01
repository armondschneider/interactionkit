"use client";

import { ArrowLeft, ArrowRight, MoreHorizontal, RefreshCw, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ToolId = "back" | "forward" | "search" | "reload" | "options";

type Props = {
  soundEnabled?: boolean;
};

type BrowserWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

type Rectangle = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const tools: Array<{ id: ToolId; label: string }> = [
  { id: "back", label: "Back" },
  { id: "forward", label: "Forward" },
  { id: "search", label: "Search" },
  { id: "reload", label: "Reload" },
  { id: "options", label: "Options" },
];

function playTone(context: AudioContext, from: number, to: number, start: number, duration: number, volume: number) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

function ToolContent({ id }: { id: ToolId }) {
  if (id === "search") {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <Search aria-hidden="true" className="size-3.5 shrink-0" />
        <span className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">Search</span>
      </span>
    );
  }

  const Icon = { back: ArrowLeft, forward: ArrowRight, reload: RefreshCw, options: MoreHorizontal }[id];
  return <Icon aria-hidden="true" className="size-4" />;
}

export default function DetachableBrowserToolbar({ soundEnabled = true }: Props) {
  const [order, setOrder] = useState<ToolId[]>(tools.map(({ id }) => id));
  const [pressedId, setPressedId] = useState<ToolId | null>(null);
  const [draggingId, setDraggingId] = useState<ToolId | null>(null);
  const [ghost, setGhost] = useState<Rectangle>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [target, setTarget] = useState<Rectangle>({ left: 0, top: 0, width: 0, height: 0 });
  const [previewOffsets, setPreviewOffsets] = useState<Partial<Record<ToolId, number>>>({});
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Partial<Record<ToolId, HTMLButtonElement>>>({});
  const slotsRef = useRef<Rectangle[]>([]);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointer = useRef({ id: -1, startX: 0, startY: 0, offsetX: 0 });
  const draggingRef = useRef<ToolId | null>(null);
  const dropIndexRef = useRef(0);
  const orderRef = useRef(order);
  const audioContext = useRef<AudioContext | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const playSound = (kind: "press" | "lift" | "drop") => {
    if (!soundEnabled || typeof window === "undefined") return;

    try {
      const AudioContextConstructor = window.AudioContext ?? (window as BrowserWindow).webkitAudioContext;
      if (!AudioContextConstructor) return;
      if (!audioContext.current) audioContext.current = new AudioContextConstructor();
      const context = audioContext.current;
      if (context.state === "suspended") void context.resume().catch(() => {});
      const now = context.currentTime;

      if (kind === "press") playTone(context, 210, 155, now, 0.13, 0.025);
      if (kind === "lift") {
        playTone(context, 260, 390, now, 0.12, 0.03);
        playTone(context, 390, 520, now + 0.08, 0.13, 0.025);
      }
      if (kind === "drop") {
        playTone(context, 190, 125, now, 0.12, 0.035);
        playTone(context, 380, 570, now + 0.11, 0.18, 0.025);
        playTone(context, 570, 760, now + 0.2, 0.18, 0.02);
      }
    } catch {
      // Sound is optional and should not interfere with dragging.
    }
  };

  const lift = (id: ToolId, element: HTMLButtonElement) => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;

    const itemRect = element.getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const width = id === "search" ? Math.min(itemRect.width, 112) : itemRect.width;
    const left = Math.min(toolbarRect.right - width, Math.max(toolbarRect.left, pointer.current.startX - width / 2));
    const slots = orderRef.current.map((toolId) => {
      const rect = itemRefs.current[toolId]?.getBoundingClientRect() ?? itemRect;
      return {
        left: rect.left - toolbarRect.left,
        top: rect.top - toolbarRect.top,
        width: rect.width,
        height: rect.height,
      };
    });
    const originalIndex = orderRef.current.indexOf(id);
    const originalSlot = slots[originalIndex];
    const initialTarget = {
      left: Math.max(0, Math.min(originalSlot.left + (originalSlot.width - width) / 2, toolbarRect.width - width)),
      top: originalSlot.top,
      width,
      height: itemRect.height,
    };

    slotsRef.current = slots;
    pointer.current.offsetX = width / 2;
    draggingRef.current = id;
    dropIndexRef.current = originalIndex;
    setPressedId(null);
    setDraggingId(id);
    setGhost({ left, top: itemRect.top, width, height: itemRect.height });
    setTarget(initialTarget);
    setPreviewOffsets({});
    playSound("lift");
  };

  const moveDrag = (pointerX: number) => {
    const id = draggingRef.current;
    const toolbar = toolbarRef.current;
    if (!id || !toolbar) return;

    const toolbarRect = toolbar.getBoundingClientRect();
    const slots = slotsRef.current;
    let nextIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    slots.forEach((slot, index) => {
      const center = toolbarRect.left + slot.left + slot.width / 2;
      const distance = Math.abs(pointerX - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    const targetSlot = slots[nextIndex];
    const previewOrder = orderRef.current.filter((toolId) => toolId !== id);
    previewOrder.splice(nextIndex, 0, id);
    const gap = slots.length > 1 ? slots[1].left - slots[0].left - slots[0].width : 4;
    const offsets: Partial<Record<ToolId, number>> = {};
    let cursor = slots[0]?.left ?? 0;
    let draggedLeft = cursor;

    previewOrder.forEach((toolId) => {
      const currentIndex = orderRef.current.indexOf(toolId);
      const currentSlot = slots[currentIndex];
      if (toolId === id) {
        draggedLeft = cursor;
      } else {
        offsets[toolId] = cursor - currentSlot.left;
      }
      cursor += currentSlot.width + gap;
    });

    const draggedSlot = slots[orderRef.current.indexOf(id)];
    const targetLeft = draggedLeft + (draggedSlot.width - target.width) / 2;
    const targetLeftClamped = Math.max(0, Math.min(targetLeft, toolbarRect.width - target.width));
    const ghostLeft = Math.max(
      toolbarRect.left,
      Math.min(pointerX - pointer.current.offsetX, toolbarRect.right - ghost.width),
    );

    dropIndexRef.current = nextIndex;
    setGhost((value) => ({ ...value, left: ghostLeft }));
    setTarget((value) => ({ ...value, left: targetLeftClamped, top: targetSlot.top }));
    setPreviewOffsets(offsets);
  };

  const endInteraction = () => {
    clearHold();
    setPressedId(null);
    pointer.current.id = -1;

    const id = draggingRef.current;
    if (!id) return;

    const nextOrder = orderRef.current.filter((toolId) => toolId !== id);
    nextOrder.splice(dropIndexRef.current, 0, id);
    orderRef.current = nextOrder;
    setOrder(nextOrder);
    setPreviewOffsets({});
    draggingRef.current = null;
    setDraggingId(null);
    playSound("drop");
  };

  useEffect(() => () => {
    clearHold();
    audioContext.current?.close().catch(() => {});
  }, []);

  return (
    <div
      ref={toolbarRef}
      className={`relative -my-8 flex w-full max-w-xl items-center justify-center gap-1 py-8 ${draggingId ? "cursor-grabbing" : ""}`}
      aria-label="Customizable browser toolbar"
    >
      {order.map((id) => {
        const tool = tools.find((item) => item.id === id)!;
        const isDragging = draggingId === id;
        const isSearch = id === "search";

        return (
          <button
            key={id}
            ref={(element) => {
              if (element) itemRefs.current[id] = element;
            }}
            type="button"
            aria-label={`${tool.label}. Press and hold to move.`}
            onPointerDown={(event) => {
              if (!event.isPrimary || event.button !== 0 || draggingRef.current) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              pointer.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, offsetX: 0 };
              setPressedId(id);
              playSound("press");
              const element = event.currentTarget;
              holdTimer.current = setTimeout(() => lift(id, element), 420);
            }}
            onPointerMove={(event) => {
              if (pointer.current.id !== event.pointerId) return;

              if (!draggingRef.current) {
                if (Math.hypot(event.clientX - pointer.current.startX, event.clientY - pointer.current.startY) > 8) {
                  clearHold();
                  setPressedId(null);
                }
                return;
              }

              moveDrag(event.clientX);
            }}
            onPointerUp={endInteraction}
            onPointerCancel={endInteraction}
            onLostPointerCapture={endInteraction}
            style={{ transform: `translateX(${previewOffsets[id] ?? 0}px)` }}
            className={`relative z-10 flex h-9 shrink-0 touch-none select-none items-center justify-center rounded-lg border text-neutral-600 outline-none after:absolute after:-inset-1 after:content-[''] focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 ${isSearch ? "w-28 justify-start px-2 sm:w-40 sm:px-3" : "w-8 sm:w-9"} ${draggingId ? "transition-transform duration-200 ease-out" : ""} ${isDragging ? "cursor-grabbing border-transparent bg-transparent opacity-0" : "cursor-grab border-neutral-200 bg-neutral-50 shadow-sm shadow-neutral-100/50 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/10 dark:hover:bg-neutral-700"}`}
          >
            <motion.span
              animate={{ scale: pressedId === id ? 0.96 : 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
              className={`flex size-full items-center ${isSearch ? "justify-start" : "justify-center"}`}
            >
              <ToolContent id={id} />
            </motion.span>
          </button>
        );
      })}

      {draggingId && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ left: target.left, top: target.top, width: target.width, height: target.height, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : {
            left: { type: "spring", stiffness: 500, damping: 32, mass: 0.4 },
            top: { duration: 0 },
            width: { duration: 0 },
            height: { duration: 0 },
            opacity: { duration: 0 },
          }}
          className="pointer-events-none absolute z-20 rounded-lg"
        >
          <svg className="size-full overflow-visible" viewBox="0 0 100 36" preserveAspectRatio="none">
            <motion.rect
              x="1"
              y="1"
              width="98"
              height="34"
              rx="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="3 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -14] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="text-neutral-300 dark:text-neutral-600"
            />
          </svg>
        </motion.div>
      )}

      {draggingId && (
        <motion.div
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, left: ghost.left, top: ghost.top }}
          animate={prefersReducedMotion
            ? { opacity: 1, left: ghost.left, top: ghost.top, width: ghost.width, scale: 1 }
            : { opacity: 1, left: ghost.left, top: ghost.top, width: ghost.width, scale: 1.04, rotate: [-1.2, 1.2, -1.2] }}
          transition={prefersReducedMotion ? { duration: 0 } : {
            opacity: { duration: 0.12 },
            left: { duration: 0 },
            width: { type: "spring", stiffness: 450, damping: 28 },
            scale: { type: "spring", stiffness: 450, damping: 24 },
            rotate: { duration: 0.16, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ position: "fixed", height: ghost.height }}
          className="pointer-events-none z-50 flex cursor-grabbing items-center justify-center rounded-lg border border-neutral-300 bg-white px-3 text-neutral-700 shadow-lg dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
        >
          <ToolContent id={draggingId} />
        </motion.div>
      )}
    </div>
  );
}
