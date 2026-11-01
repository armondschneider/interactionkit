"use client";

import { Moon, Sun } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { useState, type ReactNode } from "react";
import CodeBlock from "../_components/code/CodeBlock";
import TextHighlight from "../_components/highlight/TextHighlight";
import ImageModal from "../_components/image/ImageModal";
import MultipleImageExpand from "../_components/image/MultipleImageExpand";
import SoundToggle from "../_components/sound/SoundToggle";
import EmojiPicker from "../_components/emoji/EmojiPicker";
import SearchExpand from "../_components/search/SearchExpand";
import FeedbackMorph from "../_components/feedback/FeedbackMorph";
import NotificationRevealDemo from "../_components/notification/NotificationRevealDemo";
import { SpringButton, SpringLinkButton } from "../_components/general/SpringButton";
import ClickHoldDeleteDemo from "../_components/general/ClickHoldDeleteDemo";
import Tab from "../_components/tabs/Tab";
import Tooltip from "../_components/hover/Tooltip";
import PasswordInput from "../_components/input/PasswordInput";
import MaxWidthDemo from "../_components/layout/MaxWidthDemo";
import SwipeToDeleteDemo from "../_components/general/SwipeToDeleteDemo";
import SquishyButton from "../_components/general/SquishyButton";
import DownloadFileDemo from "../_components/general/DownloadFileDemo";

type DemoSectionProps = {
  title: string;
  category: string;
  href: string;
  dark: boolean;
  allowOverflow?: boolean;
  children: ReactNode;
};

function DemoSection({ title, category, href, dark, allowOverflow = false, children }: DemoSectionProps) {
  return (
    <article className={`border-t py-6 sm:py-7 ${dark ? "border-neutral-800" : "border-neutral-200"}`}>
      <header className="mb-7 flex items-start justify-between">
        <div>
          <h2 className={`text-sm font-medium ${dark ? "text-neutral-100" : "text-neutral-800"}`}>{title}</h2>
          <p className="mt-1 text-xs text-neutral-400">{category}</p>
        </div>
        <SpringLinkButton
          href={href}
          variant="filled"
          className="text-xs"
        >
          Open example
        </SpringLinkButton>
      </header>
      <div className={`flex h-[280px] items-center justify-center ${allowOverflow ? "overflow-visible" : "overflow-hidden"} rounded-xl border sm:h-[310px] ${dark ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-white/40"}`}>
        {children}
      </div>
    </article>
  );
}

export default function Archive() {
  const [dimmed, setDimmed] = useState(false);

  return (
    <>
    <main className={`min-h-screen transition-colors ${dimmed ? "dark bg-[#171716] text-neutral-100" : "bg-neutral-50 text-neutral-800"}`}>
      <nav className="mx-auto flex h-14 w-[calc(100%-2rem)] max-w-[620px] items-center justify-between text-xs text-neutral-400 sm:w-[calc(100%-2.5rem)]" aria-label="Primary navigation">
        <a href="/" className="flex min-h-8 min-w-8 items-center" aria-label="InteractionKit home"><span className="h-3 w-3 rounded-full bg-neutral-900 transition-colors duration-150 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-white" /></a>
        <div className="flex items-center gap-3">
          <a href="/" className="inline-flex min-h-8 items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">Home</a>
          <a className="transition-[color,transform] duration-150 hover:-translate-y-px hover:text-neutral-800 dark:hover:text-neutral-200" href="https://x.com/armondme" target="_blank" rel="noreferrer">X</a>
          <a className="transition-[color,transform] duration-150 hover:-translate-y-px hover:text-neutral-800 dark:hover:text-neutral-200" href="https://github.com/armondschneider/interactionkit" target="_blank" rel="noreferrer">GitHub</a>
          <button className="grid cursor-pointer place-items-center transition-[color,transform] duration-150 hover:-translate-y-px hover:text-neutral-800 dark:hover:text-neutral-200" onClick={() => setDimmed((value) => !value)} aria-label="Toggle display">
            {dimmed ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>

      <div className="mx-auto w-[calc(100%-2rem)] max-w-[594px] sm:w-[calc(100%-2.5rem)]" id="top">
        <section className="py-20 sm:py-[104px]" aria-labelledby="page-title">
          <h1 id="page-title" className="text-xs font-medium text-neutral-500 dark:text-neutral-400">InteractionKit / Archive</h1>
          <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">The original collection of copy-ready React interactions. Small studies in the quiet details that make an interface feel considered.</p>
          <a href="/view" className="group mt-6 inline-flex min-h-8 items-center text-xs text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <span className="underline decoration-neutral-300 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-neutral-700 dark:decoration-neutral-700 dark:group-hover:decoration-neutral-300">Image View Transitions</span>
          </a>
        </section>

        <section aria-label="Live interaction examples">
          <DemoSection title="Download to file" category="Progress and completion" href="/demo/download-file" dark={dimmed}>
            <DownloadFileDemo />
          </DemoSection>

          <DemoSection title="Image expand" category="Spatial interaction" href="/demo/imageexpand" dark={dimmed}>
            <div className="scale-[.52] sm:scale-[.66]">
              <MultipleImageExpand
                images={[
                  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop", alt: "Desert" },
                  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop", alt: "Mountains" },
                  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", alt: "Ocean" },
                  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600&auto=format&fit=crop", alt: "Lake" },
                ]}
              />
            </div>
          </DemoSection>

          <DemoSection title="Image modal" category="Focus and hierarchy" href="/demo/imagemodal" dark={dimmed}>
            <div className="w-[260px] [&>button]:h-[164px]">
              <ImageModal src="https://images.unsplash.com/photo-1763503586151-53f36b00eb46?q=80&w=900&auto=format&fit=crop" alt="Mountain landscape" layoutId="home-image-modal" />
            </div>
          </DemoSection>

          <DemoSection title="Icon morph" category="State feedback" href="/demo/sound" dark={dimmed}>
            <div className="flex flex-col items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
              <SoundToggle playSound={false} className="border border-neutral-200 !bg-white !p-3.5 !text-neutral-800 shadow-[0_5px_12px_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:!bg-neutral-800 dark:!text-neutral-100 dark:shadow-black/20" />
              <span>Toggle sound</span>
            </div>
          </DemoSection>

          <DemoSection title="Emoji picker" category="Expressive input" href="/demo/emoji-picker" dark={dimmed} allowOverflow>
            <div className="flex -translate-y-24 flex-col items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
              <EmojiPicker />
              <span>Choose an emoji</span>
            </div>
          </DemoSection>

          <DemoSection title="Search expand" category="Focused input" href="/demo/search-expand" dark={dimmed} allowOverflow>
            <div className="-translate-y-20">
              <SearchExpand />
            </div>
          </DemoSection>

          <DemoSection title="Feedback morph" category="Inline feedback" href="/demo/feedback-morph" dark={dimmed}>
            <div className="flex flex-col items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>Was this helpful?</span>
              <FeedbackMorph />
            </div>
          </DemoSection>

          <DemoSection title="Incorrect password" category="Input validation" href="/demo/password-input" dark={dimmed}>
            <div className="w-[calc(100%-2.5rem)] max-w-72">
              <PasswordInput verifyPassword={(password) => password === "oliver"} />
            </div>
          </DemoSection>

          <DemoSection title="Max width" category="Responsive layout" href="/demo/max-width" dark={dimmed}>
            <MaxWidthDemo />
          </DemoSection>

          <DemoSection title="Notification reveal" category="Transient feedback" href="/demo/notification-reveal" dark={dimmed}>
            <NotificationRevealDemo />
          </DemoSection>

          <DemoSection title="Spring button" category="Press feedback" href="/demo/spring-button" dark={dimmed}>
            <div className="flex items-center gap-4">
              <SpringButton pressSpring={false}>Hover only</SpringButton>
              <SpringButton>Press spring</SpringButton>
            </div>
          </DemoSection>

          <DemoSection title="Squishy button" category="Press and hold" href="/squishy" dark={dimmed}>
            <div className="w-[min(18rem,calc(100%-1.5rem))]">
              <SquishyButton soundEnabled={false} />
            </div>
          </DemoSection>

          <DemoSection title="Hold to delete" category="Deliberate action" href="/demo/click-hold-button" dark={dimmed}>
            <ClickHoldDeleteDemo />
          </DemoSection>

          <DemoSection title="Swipe to delete" category="List actions" href="/demo/swipe-to-delete" dark={dimmed}>
            <SwipeToDeleteDemo />
          </DemoSection>

          <DemoSection title="Tabs" category="Content navigation" href="/demo/tabs" dark={dimmed}>
            <div className="h-full w-[calc(100%-2.5rem)] max-w-[410px] pt-12 [&_.gap-3]:gap-2 [&_.h-20]:h-[43px] [&_.space-y-3_>_:not([hidden])_~_:not([hidden])]:mt-2 [&_button]:!px-3 [&_button]:!py-2 [&_button]:!text-xs">
              <Tab />
            </div>
          </DemoSection>

          <DemoSection title="Text highlight" category="Reading interaction" href="/demo/text-highlight" dark={dimmed}>
            <p className="-translate-y-12 max-w-[260px] text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              The view across {" "}
              <TextHighlight
                imageSrc="https://images.pexels.com/photos/28212365/pexels-photo-28212365.jpeg"
                imageAlt="Savanna landscape"
                previewClassName="!w-48 sm:!w-48 [&_img]:!rounded-lg [&_img]:!border-4"
              >
                Tanzania
              </TextHighlight>
              {" "}stays with you.
            </p>
          </DemoSection>

          <DemoSection title="Tooltip" category="Context on demand" href="/demo/tooltip" dark={dimmed}>
            <div className="flex flex-col items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400 [&_svg]:w-3.5 [&>div>div]:!text-xs [&>div>div]:!text-neutral-700 dark:[&>div>div]:!text-neutral-200">
              <Tooltip content="A little extra context, without getting in the way."><span>Hover for detail</span></Tooltip>
            </div>
          </DemoSection>

          <DemoSection title="Code block" category="Copy feedback" href="/demo/codeblock" dark={dimmed}>
            <div className="w-[calc(100%-2.5rem)] max-w-[350px]">
              <CodeBlock code={'const interaction = "useful";\n\nconsole.log(interaction);'} language="ts" />
            </div>
          </DemoSection>
        </section>

        <footer className={`border-t py-6 pb-16 text-[11px] text-neutral-400 transition-colors ${dimmed ? "border-neutral-800" : "border-neutral-200"}`}>
          Made by <a href="https://armond.me" className="underline transition-colors duration-150 hover:text-neutral-800 dark:hover:text-neutral-200">Armond Schneider</a>
        </footer>
      </div>
    </main>
    <Analytics />
    </>
  );
}
