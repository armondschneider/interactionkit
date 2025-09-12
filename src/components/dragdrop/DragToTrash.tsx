"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import ClickHoldButton from "../general/ClickHoldButton";

type Props = {
  src: string;
  alt?: string;
  onDelete?: () => void;
};

export default function DragToTrash({ src, alt = "", onDelete }: Props) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const trashRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isOverTrashZone, setIsOverTrashZone] = useState(false);
  const [inTrash, setInTrash] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function checkOverTrash() {
    if (!imgRef.current || !trashRef.current) return false;
    const imgRect = imgRef.current.getBoundingClientRect();
    const trashRect = trashRef.current.getBoundingClientRect();
    const cx = imgRect.left + imgRect.width / 2;
    const cy = imgRect.top + imgRect.height / 2;
    return cx >= trashRect.left && cx <= trashRect.right && cy >= trashRect.top && cy <= trashRect.bottom;
  }

  const handleDrag = () => {
    if (!isDragging) return;
    const overTrash = checkOverTrash();
    setIsOverTrashZone(overTrash);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const overTrash = checkOverTrash();
    setIsOverTrashZone(false);

    if (overTrash) {
      // calculate drop position and animate into trash
      const imgRect = imgRef.current!.getBoundingClientRect();
      const trashRect = trashRef.current!.getBoundingClientRect();
      const dx = trashRect.left + trashRect.width / 2 - (imgRect.left + imgRect.width / 2);
      const dy = trashRect.top + trashRect.height / 2 - (imgRect.top + imgRect.height / 2);

      // swap trash image immediately and animate drop
      setInTrash(true);
      animate(x, x.get() + dx, { type: "spring", stiffness: 600, damping: 20, mass: 0.4 });
      animate(y, y.get() + dy, { type: "spring", stiffness: 600, damping: 20, mass: 0.4 });
    } else {
      // snap back
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  const handleDelete = () => {
    setDeleted(true);
    setInTrash(false);
    onDelete?.();
  };

  if (deleted) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        ref={imgRef}
        drag={!inTrash}
        dragMomentum={false}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={
          inTrash
            ? { scale: 0, opacity: 0 }
            : { scale: isDragging ? (isOverTrashZone ? 0.5 : 0.8) : 1, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-48 h-32 rounded-xl overflow-hidden shadow-md cursor-grab active:cursor-grabbing relative z-50"
        style={{ touchAction: "none", x, y }}
      >
        <div className="relative w-full h-full">
          <Image src={src} alt={alt} fill className="object-cover" draggable={false} onDragStart={(e) => e.preventDefault()} />
        </div>
      </motion.div>

      <div className="flex flex-col items-center">
        <div
          ref={trashRef}
          id="trash-bin"
          className={`relative w-30 h-30 rounded-2xl flex items-center justify-center transition-all z-10 ${
            isOverTrashZone ? "bg-neutral-100" : "bg-transparent"
          }`}
        >
          <div className="relative w-20 h-20">
            <Image
              src={inTrash ? "/imgs/dragdrop/trashfull.png" : "/imgs/dragdrop/trashempty.png"}
              alt="trash"
              fill
              className="object-contain"
              draggable={false}
            />
          </div>
        </div>

        {inTrash && (
          <div className="mt-3">
            <ClickHoldButton onConfirm={handleDelete} duration={900}>
              Click and hold to delete
            </ClickHoldButton>
          </div>
        )}
      </div>
    </div>
  );
}
