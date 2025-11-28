"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
	initialOn?: boolean;
	size?: number | string;
	className?: string;
	ariaLabel?: string;
	playSound?: boolean;
	onToggle?: (on: boolean) => void;
};

export default function SoundToggle({
	initialOn = true,
	size = 18,
	className = "",
	ariaLabel,
	playSound = true,
	onToggle,
}: Props) {
	const [on, setOn] = useState<boolean>(initialOn);

	const toggle = () => {
		setOn((prev) => {
			const next = !prev;
			onToggle?.(next);
			if (playSound) {
				// Short beep for on/off
				// On: higher beep, Off: lower beep
				if (next) playTone(880, 0.14);
				else playTone(440, 0.12);
			}
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
			className={`cursor-pointer inline-flex items-center justify-center rounded-full p-1 text-neutral-700 hover:text-neutral-900 ${className}`}
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

// Simple WebAudio helper to play a short tone
function playTone(freq = 880, durationSec = 0.12, type: OscillatorType = "sine") {
	if (typeof window === "undefined") return;
	try {
		// Keep a single context alive for reuse
		const aWindow: any = window;
		if (!aWindow.__interactionkit_audio_ctx) {
			aWindow.__interactionkit_audio_ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
		}
		const ctx: AudioContext = aWindow.__interactionkit_audio_ctx;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		osc.connect(gain);
		gain.connect(ctx.destination);
		const now = ctx.currentTime;
		// Gentle fade in/out
		gain.gain.setValueAtTime(0.0001, now);
		gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
		osc.start(now);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
		osc.stop(now + durationSec + 0.02);
		// Note: oscillator and gain will be released by GC once disconnected/stopped
	} catch (err) {
		// Fail gracefully — some browsers may not allow audio without gesture
		// eslint-disable-next-line no-console
		console.debug("playTone failed", err);
	}
}
