"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DragToTrash from '../../../src/components/dragdrop/DragToTrash';

export default function DemoPage() {
	const [removed, setRemoved] = useState(false);

	const [items, setItems] = useState(() => [
		{
			id: 'a',
			src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0',
			alt: 'mountain',
			removed: false,
		},
		{
			id: 'b',
			src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0',
			alt: 'lake',
			removed: false,
		},
		{
			id: 'c',
			src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0',
			alt: 'ocean',
			removed: false,
		},
	]);

	return (
		<main className="min-h-screen bg-white">
			<div className="w-full max-w-lg mx-auto px-6 py-16">
				{/* <header className="mb-8">
					<Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 underline">Back</Link>
				</header> */}

				<div>
					{!removed ? (
						<DragToTrash
							src="https://images.unsplash.com/photo-1669655247997-7aaadce37d6e?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="forest"
							onDelete={() => setRemoved(true)}
						/>
					) : (
						<AnimatePresence>
							<motion.div
								key="deleted"
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 300, damping: 28 }}
								className="flex flex-col items-center justify-center gap-3 py-8"
							>
								<div className="text-sm text-neutral-600">Item deleted.</div>
								<button
									className="cursor-pointer px-3 py-1.5 text-sm rounded-md border border-neutral-200 text-neutral-700 bg-transparent hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
									onClick={() => setRemoved(false)}
								>
									Restore
								</button>
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			</div>
		</main>
	);
}
