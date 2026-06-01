"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Key, Activity, Mail } from "lucide-react";

export interface SettingsTabsProps {
  role?: string | null;
}

const ALL_TABS = [
  { slug: "account", label: "Account", icon: User, adminOnly: false },
];

export function SettingsTabs({ role }: SettingsTabsProps) {
  const pathname = usePathname();
  const isPrivileged = role === "owner" || role === "admin";

  const tabs = ALL_TABS.filter((t) => !t.adminOnly || isPrivileged);

  return (
    <nav className="flex gap-1 border-b border-[var(--border)] -mx-1 px-1">
      {tabs.map((t) => {
        const active = pathname.endsWith(`/${t.slug}`);
        const Icon = t.icon;
        return (
          <Link
            key={t.slug}
            href={`/settings/${t.slug}`}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${active
              ? "border-[var(--brand)] text-[var(--brand)]"
              : "border-transparent text-[var(--muted-fg)] hover:text-[var(--foreground)]"
              }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}