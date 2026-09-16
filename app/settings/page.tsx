import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  HelpCircle,
  KeyRound,
  Languages,
  LogOut,
  Mail,
  MapPin,
  Palette,
  Phone,
  ShieldCheck,
} from "lucide-react";
import SettingsFeedback from "../../src/components/settings/SettingsFeedback";

export const metadata: Metadata = {
  title: "Settings | Interaction Kit",
  description: "A simple account settings screen.",
};

type SettingsRowProps = {
  icon: LucideIcon;
  label: string;
  value?: string;
  danger?: boolean;
  showChevron?: boolean;
};

function SettingsRow({
  icon: Icon,
  label,
  value,
  danger = false,
  showChevron = true,
}: SettingsRowProps) {
  return (
    <button
      type="button"
      className={`group flex min-h-12 w-full cursor-pointer items-center gap-2.5 px-3.5 text-left outline-none transition-colors duration-150 first:rounded-t-[19px] last:rounded-b-[19px] hover:bg-black/[0.025] focus-visible:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-300 active:bg-black/[0.045] dark:hover:bg-white/[0.04] dark:focus-visible:bg-white/[0.06] dark:focus-visible:ring-neutral-600 dark:active:bg-white/[0.07] sm:min-h-[54px] sm:px-4 ${danger ? "text-red-500 dark:text-red-400" : "text-neutral-900 dark:text-neutral-100"}`}
    >
      <Icon
        aria-hidden="true"
        className={`size-[17px] shrink-0 stroke-[2.1] ${danger ? "text-red-400 dark:text-red-400" : "text-neutral-400 dark:text-neutral-500"}`}
      />
      <span className="min-w-0 flex-1 text-[13px] font-medium sm:text-sm">
        {label}
      </span>
      {value && (
        <span className="truncate text-[13px] font-normal text-neutral-500 dark:text-neutral-400 sm:text-sm">
          {value}
        </span>
      )}
      {showChevron && (
        <ChevronRight
          aria-hidden="true"
          className="size-[15px] shrink-0 text-neutral-300 transition-transform duration-150 group-hover:translate-x-0.5 dark:text-neutral-600"
        />
      )}
    </button>
  );
}

function SettingsGroup({ children }: { children: React.ReactNode }) {
  return (
    <section className="divide-y divide-neutral-100 overflow-hidden rounded-[20px] border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </section>
  );
}

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#f1f2f3] px-4 pb-16 text-neutral-900 dark:bg-[#171716] dark:text-neutral-100 sm:px-6 sm:pb-24">
      <div className="mx-auto w-full max-w-[440px] pt-6 sm:pt-9">
        <div className="mb-6 flex justify-center sm:mb-8" aria-hidden="true">
          <Image
            src="/img/logo.png"
            alt=""
            width={30}
            height={30}
            className="size-[30px] opacity-70"
          />
        </div>

        <div className="space-y-4 sm:space-y-5">
          <SettingsGroup>
            <button
              type="button"
              className="group flex min-h-[78px] w-full cursor-pointer items-center gap-3 px-3.5 text-left outline-none transition-colors duration-150 hover:bg-black/[0.025] focus-visible:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-300 active:bg-black/[0.045] dark:hover:bg-white/[0.04] dark:focus-visible:bg-white/[0.06] dark:focus-visible:ring-neutral-600 dark:active:bg-white/[0.07] sm:min-h-[86px] sm:px-4"
            >
              <Image
                src="/img/profile.jpg"
                alt="Armond Schneider"
                width={40}
                height={40}
                className="size-9 shrink-0 rounded-full object-cover shadow-inner sm:size-10"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold tracking-[-0.01em] sm:text-base">
                  Armond Schneider
                </span>
                <span className="mt-0.5 block truncate text-xs text-neutral-500 dark:text-neutral-400 sm:text-[13px]">
                  armond@example.com
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-neutral-300 transition-transform duration-150 group-hover:translate-x-0.5 dark:text-neutral-600"
              />
            </button>
            <SettingsRow icon={Mail} label="Email address" value="armond@example.com" />
          </SettingsGroup>

          <SettingsGroup>
            <SettingsRow icon={CircleUserRound} label="Full name" value="Armond Schneider" />
            <SettingsRow icon={Phone} label="Phone number" />
            <SettingsRow icon={MapPin} label="Address" />
          </SettingsGroup>

          <SettingsGroup>
            <SettingsRow icon={Bell} label="Notifications" />
            <SettingsRow icon={Palette} label="Appearance" value="System" />
            <SettingsRow icon={Languages} label="Language" value="English" />
          </SettingsGroup>

          <SettingsGroup>
            <SettingsRow icon={KeyRound} label="Password" />
            <SettingsRow icon={ShieldCheck} label="Privacy & security" />
            <SettingsRow icon={CreditCard} label="Billing" />
          </SettingsGroup>

          <SettingsGroup>
            <SettingsRow icon={HelpCircle} label="Help & support" />
            <SettingsRow
              icon={LogOut}
              label="Sign out"
              danger
              showChevron={false}
            />
          </SettingsGroup>
        </div>
      </div>
      <SettingsFeedback />
    </main>
  );
}
