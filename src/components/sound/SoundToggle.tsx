"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
	initialOn?: boolean;
	className?: string;
	playSound?: boolean;
	onToggle?: (on: boolean) => void;
};

export default function SoundToggle({
	initialOn = true,
	className = "",
	playSound = true,
	onToggle,
}: Props) {
	const [on, setOn] = useState(initialOn);

	const toggle = () => {
		const next = !on;
		setOn(next);
		onToggle?.(next);
		if (playSound) {
			new Audio(next ? "/sounds/toggleon.wav" : "/sounds/toggleoff.wav")
				.play()
				.catch(() => {});
		}
	};

	const label = on ? "Sound on" : "Sound off";

	return (
		<motion.button
			aria-pressed={on}
			aria-label={label}
			title={label}
			onClick={toggle}
			whileTap={{ scale: 0.9 }}
			className={`cursor-pointer inline-flex items-center justify-center rounded-full p-1 text-neutral-700 hover:text-neutral-900 ${className}`}
		>
			{on ? <Volume2 size={18} aria-hidden /> : <VolumeX size={18} aria-hidden />}
		</motion.button>
	);
}
