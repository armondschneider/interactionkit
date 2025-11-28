"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
	initialOn?: boolean;
	size?: number | string;
	className?: string;
	ariaLabel?: string;
	onToggle?: (on: boolean) => void;
};

export default function SoundToggle({
	initialOn = true,
	size = 20,
	className = "",
	ariaLabel,
	onToggle,
}: Props) {
	const [on, setOn] = useState<boolean>(initialOn);

	const toggle = () => {
		setOn((prev) => {
			const next = !prev;
			onToggle?.(next);
			return next;
		});
	};

	const label = ariaLabel ?? (on ? "Sound on" : "Sound off");

	const sizeClass = typeof size === "number" ? `${size}px` : size;

	return (
		<motion.button
			aria-pressed={on}
			aria-label={label}
			title={label}
			onClick={toggle}
			whileTap={{ scale: 0.95 }}
			className={`inline-flex items-center justify-center rounded-full p-1 text-neutral-700 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 ${className}`}
			style={{ width: sizeClass, height: sizeClass }}
		>
			{on ? (
				<Volume2 size={Number(size)} className="text-neutral-700" aria-hidden />
			) : (
				<VolumeX size={Number(size)} className="text-neutral-700" aria-hidden />
			)}
		</motion.button>
	);
}
