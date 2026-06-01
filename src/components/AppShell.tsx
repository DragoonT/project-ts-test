"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  User as UserIcon,
  Calendar,
  MessageCircle,
  Mail,
  FolderOpen,
  StickyNote,
  Contact,
  ListTodo,
  FileText,
  Palette,
  Info,
  HelpCircle,
  PieChart,
  Briefcase,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette, type CommandItem } from "./ui/CommandPalette";

interface Props {
  user: { email: string; name: string | null };
  tenant: { slug: string; name: string };
  children: React.ReactNode;
}

/**
 * Authed-app shell. Three concerns:
 *  1) sidebar drawer state on mobile (hamburger)
 *  2) collapsed sidebar state on desktop (icon-only mode)
 *  3) global search palette (⌘K)
 */
export function AppShell({ user, tenant, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("np-sidebar-collapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((v) => {
      const next = !v;
      localStorage.setItem("np-sidebar-collapsed", next ? "1" : "0");
      return next;
    });
  }

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = useMemo<CommandItem[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      { id: "dash", group: "Navigation", label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" />, onSelect: go("/dashboard") },
      { id: "settings", group: "Navigation", label: "Settings", icon: <Settings className="w-3.5 h-3.5" />, onSelect: go("/settings") },

      {
        id: "signout",
        group: "Account",
        label: "Sign out",
        icon: <LogOut className="w-3.5 h-3.5" />,
        onSelect: async () => {
          await fetch("/api/auth/sign-out", { method: "POST" });
          router.push("/auth/sign-in");
          router.refresh();
        },
      },
    ];
  }, [router]);

  return (
    <div className="flex min-h-screen">

      <div className={`hidden lg:block transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}>
        <Sidebar
          user={user}
          tenant={tenant}
          collapsed={collapsed}
          onOpenSearch={() => setPaletteOpen(true)}
        />
      </div>


      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[var(--background)] shadow-2xl flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg hover:bg-[var(--muted)] flex items-center justify-center text-[var(--muted-fg)]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <Sidebar user={user} tenant={tenant} onOpenSearch={() => setPaletteOpen(true)} />
          </div>
        </div>
      )}


      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          user={user}
          tenant={tenant}
          onMobileMenu={() => setMobileOpen(true)}
          onToggleSidebar={toggleCollapsed}
          collapsed={collapsed}
          onOpenSearch={() => setPaletteOpen(true)}
        />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl w-full">{children}</main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={commands} />
    </div>
  );
}
