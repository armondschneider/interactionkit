"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
	const coolingDown = useRef(false);
	const cooldownTimer = useRef<number | null>(null);

	useEffect(() => () => {
		if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
	}, []);

	const toggle = () => {
		if (coolingDown.current) return;

		coolingDown.current = true;
		cooldownTimer.current = window.setTimeout(() => {
			coolingDown.current = false;
			cooldownTimer.current = null;
		}, 220);

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
			className={`cursor-pointer inline-flex items-center justify-center rounded-full p-1 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white ${className}`}
		>
			<AnimatePresence initial={false} mode="wait">
				<motion.span
					key={on ? "sound-on" : "sound-off"}
					initial={{ opacity: 0, scale: 0.84, rotate: on ? -8 : 8, filter: "blur(2px)" }}
					animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
					exit={{ opacity: 0, scale: 0.84, rotate: on ? 8 : -8, filter: "blur(2px)" }}
					transition={{ type: "spring", stiffness: 1000, damping: 36, mass: 0.25 }}
					className="inline-flex"
				>
					{on ? <Volume2 size={18} aria-hidden /> : <VolumeX size={18} aria-hidden />}
				</motion.span>
			</AnimatePresence>
		</motion.button>
	);
}
