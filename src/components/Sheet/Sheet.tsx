"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ImageProp = {
  src: string;
  alt?: string;
};

type Props = {
  triggerLabel?: string;
  children?: React.ReactNode; // main content slot
  title?: React.ReactNode; // optional title displayed in header
  header?: React.ReactNode; // full custom header slot
  footer?: React.ReactNode; // footer slot
  image?: ImageProp | null; // optional image to show in the header
  // className hooks so consumers can style parts easily
  className?: string; // wrapper class
  triggerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
};

export default function Sheet({
  triggerLabel = "Open sheet",
  children,
  title,
  header,
  footer,
  image = null,
  className = "",
  triggerClassName = "",
  headerClassName = "",
  titleClassName = "",
  contentClassName = "",
  footerClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // prevent background scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(true)}
        className={
          "inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 " +
          triggerClassName
        }
      >
        {triggerLabel}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="sheet"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                // if dragged down more than 10px or velocity is high, close
                if (info.offset.y > 10 || info.velocity.y > 500) {
                  setOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 right-0 bottom-0 z-50 flex items-end justify-center"
            >
              <div
                ref={sheetRef}
                className="w-full max-w-xl mx-4 mb-6 bg-white rounded-2xl shadow-xl overflow-hidden relative min-h-[200px]"
                role="dialog"
                aria-modal="true"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>

                <div className="pt-2 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
                  <div className="w-8 h-1.5 bg-neutral-300 rounded-full" />
                </div>

                <div className={"px-4 pt-2 pb-3 " + headerClassName}>
                  {header ? (
                    header
                  ) : (
                    <div className="flex items-center gap-3">
                      {image && (
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-neutral-100">
                          <img
                            src={image.src}
                            alt={image.alt ?? ""}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {title && (
                        <div
                          className={"text-sm font-medium " + titleClassName}
                        >
                          {title}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content area */}
                <div className={"px-4 pb-4 " + contentClassName}>
                  {children ?? (
                    <div className="text-sm text-neutral-700">
                      This is a bottom sheet. Click outside or press Esc to
                      close.
                    </div>
                  )}
                </div>

                {footer && (
                  <div className={"p-4" + footerClassName}>
                    {footer}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
