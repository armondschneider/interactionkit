"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { NotificationBatteryLowIcon, NotificationBellIcon, NotificationSuccessIcon } from "./NotificationIcons";
import NotificationReveal from "./NotificationReveal";

const examples = [
  {
    label: "Meeting",
    title: "Meeting Soon",
    icon: <NotificationBellIcon className="size-4" />,
    iconClassName: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  },
  {
    label: "Charging",
    title: "Low battery",
    icon: <NotificationBatteryLowIcon className="size-4" />,
    iconClassName: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    label: "Success",
    title: "Form submitted",
    icon: <NotificationSuccessIcon className="size-5" />,
    iconClassName: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
];

export default function NotificationRevealDemo() {
  const [active, setActive] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex h-[310px] w-full flex-col items-center justify-center gap-3 overflow-hidden">
      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((example, index) => (
          <motion.button
            key={example.label}
            type="button"
            onClick={() => setActive(index)}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            className="cursor-pointer rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-neutral-300 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:text-white dark:focus-visible:ring-neutral-500"
          >
            {example.label}
          </motion.button>
        ))}
      </div>

      {active !== null && (
        <div className="pointer-events-none absolute inset-0">
          <NotificationReveal
            key={active}
            position="absolute"
            showTrigger={false}
            autoReveal
            title={examples[active].title}
            icon={examples[active].icon}
            iconClassName={examples[active].iconClassName}
          />
        </div>
      )}
    </div>
  );
}
