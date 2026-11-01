"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

type Conversation = {
  id: number;
  name: string;
  preview: string;
  time: string;
  initials: string;
  color: string;
};

const initialConversations: Conversation[] = [
  { id: 1, name: "Maya Chen", preview: "The photos from the trip are ready", time: "9:42 AM", initials: "MC", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
  { id: 2, name: "Design team", preview: "Alex shared a new prototype", time: "Yesterday", initials: "DT", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  { id: 3, name: "Jordan Lee", preview: "Want to grab coffee this week?", time: "Monday", initials: "JL", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
];

const deleteThreshold = -92;
const deleteRevealThreshold = -36;

function SwipeRow({ conversation, onDelete }: { conversation: Conversation; onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      layout
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, marginBottom: 0 }}
      transition={prefersReducedMotion ? { duration: 0.15 } : { type: "spring", stiffness: 420, damping: 32 }}
      className="relative overflow-hidden rounded-xl"
    >
      <motion.button
        type="button"
        onClick={onDelete}
        tabIndex={showDelete ? 0 : -1}
        aria-hidden={!showDelete}
        aria-label={`Delete conversation with ${conversation.name}`}
        initial={false}
        animate={showDelete ? { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, scale: 0.8, x: 10, filter: "blur(8px)" }}
        transition={prefersReducedMotion ? { duration: 0.12 } : {
          scale: { type: "spring", stiffness: 440, damping: 24 },
          x: { type: "spring", stiffness: 440, damping: 24 },
          opacity: { duration: 0.16, ease: "easeOut" },
          filter: { duration: 0.2, ease: "easeOut" },
        }}
        className="group absolute inset-y-0 right-1 flex w-[72px] cursor-pointer flex-col items-center justify-center gap-1 text-[10px] font-medium text-neutral-500 [will-change:transform,opacity,filter] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset dark:text-neutral-400"
      >
        <span className="grid size-10 place-items-center rounded-full bg-red-500 text-white transition-colors group-hover:bg-red-600 dark:bg-red-600 dark:group-hover:bg-red-700">
          <Trash2 size={16} aria-hidden="true" />
        </span>
        <span>Delete</span>
      </motion.button>

      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -104, right: 0 }}
        dragElastic={{ left: 0, right: 0 }}
        whileDrag={prefersReducedMotion ? undefined : { scale: 0.98 }}
        animate={{ x: isOpen ? -80 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 430, damping: 34 }}
        onDrag={(_, info) => {
          if (!isOpen && info.offset.x < deleteRevealThreshold) setShowDelete(true);
          if (isOpen && info.offset.x > 20) setShowDelete(false);
          if (info.offset.x >= 0 && !isOpen) setShowDelete(false);
        }}
        onDragEnd={(_, info) => {
          if (info.offset.x <= deleteThreshold || info.velocity.x < -650) {
            onDelete();
            return;
          }
          const nextIsOpen = info.offset.x < -42;
          setIsOpen(nextIsOpen);
          setShowDelete(nextIsOpen);
        }}
        onKeyDown={(event) => {
          if (event.key === "Delete" || event.key === "Backspace") {
            event.preventDefault();
            onDelete();
          }
          if (event.key === "Escape") {
            setIsOpen(false);
            setShowDelete(false);
          }
        }}
        role="group"
        tabIndex={0}
        aria-label={`${conversation.name}. Swipe left to reveal delete.`}
        className="relative flex min-h-[68px] cursor-grab touch-pan-y items-center gap-3 rounded-xl bg-neutral-100 px-3.5 py-3 active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-inset dark:bg-neutral-800 dark:focus-visible:ring-neutral-500"
      >
        <span className={`grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${conversation.color}`} aria-hidden="true">
          {conversation.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="truncate text-xs font-medium text-neutral-800 dark:text-neutral-100">{conversation.name}</span>
            <span className="shrink-0 text-[10px] text-neutral-400">{conversation.time}</span>
          </span>
          <span className="mt-1 block truncate text-[11px] text-neutral-500 dark:text-neutral-400">{conversation.preview}</span>
        </span>
      </motion.div>
    </motion.li>
  );
}

export default function SwipeToDeleteDemo() {
  const [conversations, setConversations] = useState(initialConversations);

  const deleteConversation = (id: number) => {
    setConversations((current) => current.filter((conversation) => conversation.id !== id));
  };

  return (
    <div className="relative h-[230px] w-[calc(100%-2rem)] max-w-[350px]">
      <motion.ul layout className="space-y-2" aria-label="Conversations">
        <AnimatePresence initial={false}>
          {conversations.map((conversation) => (
            <SwipeRow
              key={conversation.id}
              conversation={conversation}
              onDelete={() => deleteConversation(conversation.id)}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
      {conversations.length < initialConversations.length && (
        <button
          type="button"
          onClick={() => setConversations(initialConversations)}
          className="absolute bottom-0 left-1/2 inline-flex min-h-8 -translate-x-1/2 items-center gap-1 rounded-full px-2 text-[10px] font-medium text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-500"
        >
          <RotateCcw size={12} aria-hidden="true" />
          Reset
        </button>
      )}
    </div>
  );
}
