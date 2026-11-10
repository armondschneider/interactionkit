"use client";

import { Analytics } from "@vercel/analytics/next";
import { type ReactNode } from "react";
import Link from "next/link";
import ArchiveShell from "../../src/site/ArchiveShell";
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
  allowOverflow?: boolean;
  children: ReactNode;
};

function DemoSection({ title, category, href, allowOverflow = false, children }: DemoSectionProps) {
  return (
    <article className="border-t border-neutral-200/80 py-6 sm:py-7 dark:border-neutral-800">
      <header className="mb-7 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{category}</p>
        </div>
        <SpringLinkButton
          href={href}
          variant="filled"
          className="text-xs"
        >
          Open example
        </SpringLinkButton>
      </header>
      <div className={`flex h-[280px] items-center justify-center ${allowOverflow ? "overflow-visible" : "overflow-hidden"} rounded-lg border border-neutral-200/80 bg-neutral-50/70 sm:h-[310px] dark:border-neutral-800 dark:bg-neutral-900/40`}>
        {children}
      </div>
    </article>
  );
}

export default function Archive() {
  return (
    <>
    <ArchiveShell>
      <div id="top">
        <section className="pb-10 pt-6" aria-labelledby="page-title">
          <h1 id="page-title" className="font-medium">Old interactions</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">The original collection of copy-ready React interactions. Small studies in the details that make an interface feel considered.</p>
          <Link href="/view" className="group mt-3 inline-flex min-h-8 items-center text-xs text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <span className="underline decoration-neutral-300 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-neutral-700 dark:decoration-neutral-700 dark:group-hover:decoration-neutral-300">Image View Transitions</span>
          </Link>
        </section>

        <section aria-label="Live interaction examples">
          <DemoSection title="Download to file" category="Progress and completion" href="/demo/download-file">
            <DownloadFileDemo />
          </DemoSection>

          <DemoSection title="Image expand" category="Spatial interaction" href="/demo/imageexpand">
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

          <DemoSection title="Image modal" category="Focus and hierarchy" href="/demo/imagemodal">
            <div className="w-[260px] [&>button]:h-[164px]">
              <ImageModal src="https://images.unsplash.com/photo-1763503586151-53f36b00eb46?q=80&w=900&auto=format&fit=crop" alt="Mountain landscape" layoutId="home-image-modal" />
            </div>
          </DemoSection>

          <DemoSection title="Icon morph" category="State feedback" href="/demo/sound">
            <div className="flex flex-col items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
              <SoundToggle playSound={false} className="border border-neutral-200 !bg-white !p-3.5 !text-neutral-800 shadow-[0_5px_12px_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:!bg-neutral-800 dark:!text-neutral-100 dark:shadow-black/20" />
              <span>Toggle sound</span>
            </div>
          </DemoSection>

          <DemoSection title="Emoji picker" category="Expressive input" href="/demo/emoji-picker" allowOverflow>
            <div className="flex -translate-y-24 flex-col items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
              <EmojiPicker />
              <span>Choose an emoji</span>
            </div>
          </DemoSection>

          <DemoSection title="Search expand" category="Focused input" href="/demo/search-expand" allowOverflow>
            <div className="-translate-y-20">
              <SearchExpand />
            </div>
          </DemoSection>

          <DemoSection title="Feedback morph" category="Inline feedback" href="/demo/feedback-morph">
            <div className="flex flex-col items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>Was this helpful?</span>
              <FeedbackMorph />
            </div>
          </DemoSection>

          <DemoSection title="Incorrect password" category="Input validation" href="/demo/password-input">
            <div className="w-[calc(100%-2.5rem)] max-w-72">
              <PasswordInput verifyPassword={(password) => password === "oliver"} />
            </div>
          </DemoSection>

          <DemoSection title="Max width" category="Responsive layout" href="/demo/max-width">
            <MaxWidthDemo />
          </DemoSection>

          <DemoSection title="Notification reveal" category="Transient feedback" href="/demo/notification-reveal">
            <NotificationRevealDemo />
          </DemoSection>

          <DemoSection title="Spring button" category="Press feedback" href="/demo/spring-button">
            <div className="flex items-center gap-4">
              <SpringButton pressSpring={false}>Hover only</SpringButton>
              <SpringButton>Press spring</SpringButton>
            </div>
          </DemoSection>

          <DemoSection title="Squishy button" category="Press and hold" href="/squishy">
            <div className="w-[min(18rem,calc(100%-1.5rem))]">
              <SquishyButton soundEnabled={false} />
            </div>
          </DemoSection>

          <DemoSection title="Hold to delete" category="Deliberate action" href="/demo/click-hold-button">
            <ClickHoldDeleteDemo />
          </DemoSection>

          <DemoSection title="Swipe to delete" category="List actions" href="/demo/swipe-to-delete">
            <SwipeToDeleteDemo />
          </DemoSection>

          <DemoSection title="Tabs" category="Content navigation" href="/demo/tabs">
            <div className="h-full w-[calc(100%-2.5rem)] max-w-[410px] pt-12 [&_.gap-3]:gap-2 [&_.h-20]:h-[43px] [&_.space-y-3_>_:not([hidden])_~_:not([hidden])]:mt-2 [&_button]:!px-3 [&_button]:!py-2 [&_button]:!text-xs">
              <Tab />
            </div>
          </DemoSection>

          <DemoSection title="Text highlight" category="Reading interaction" href="/demo/text-highlight">
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

          <DemoSection title="Tooltip" category="Context on demand" href="/demo/tooltip">
            <div className="flex flex-col items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400 [&_svg]:w-3.5 [&>div>div]:!text-xs [&>div>div]:!text-neutral-700 dark:[&>div>div]:!text-neutral-200">
              <Tooltip content="A little extra context, without getting in the way."><span>Hover for detail</span></Tooltip>
            </div>
          </DemoSection>

          <DemoSection title="Code block" category="Copy feedback" href="/demo/codeblock">
            <div className="w-[calc(100%-2.5rem)] max-w-[350px]">
              <CodeBlock code={'const interaction = "useful";\n\nconsole.log(interaction);'} language="ts" />
            </div>
          </DemoSection>
        </section>

      </div>
    </ArchiveShell>
    <Analytics />
    </>
  );
}
