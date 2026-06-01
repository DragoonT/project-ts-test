"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Search, Mail } from "lucide-react";
import { Input, Btn } from "@/components/ui";

const FAQ_GROUPS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Licensing & Pricing",
    items: [
      { q: "???????????", a: "Yes — ???????????. No questions asked." },
      { q: "Can I use Project for client projects?", a: "Yes. The ????????????????????????" },
      { q: "Do you offer ??????????", a: "??????????????. Need more seats? Email us." },
      { q: "Do I get future updates?", a: "All ???????? include 1 year of updates. After that, ??????????????????." },
    ],
  },
  {
    category: "Tech stack",
    items: [
      { q: "What's included out of the box?", a: "Next.js 16, React 19, Prisma 6, Tailwind 4, magic-link auth, etc." },
      { q: "Can I swap Prisma for Drizzle?", a: "Yes. Database access lives in a single layer (src/lib/prisma.ts). Replacing it is a few-hour job." },
      { q: "Does it work with Postgres?", a: "Yes. SQLite is the demo default; switch to Postgres by changing the provider in schema.prisma and the DATABASE_URL." },
      { q: "????????????", a: "??????????????????????????????." },
    ],
  },
  {
    category: "Deployment & ops",
    items: [
      { q: "Where can I deploy this?", a: "Anywhere Node 20+ runs. Vercel, Railway, Render, Fly.io, your own VPS — all supported. Includes a Docker file." },
      { q: "Is there an ????????????? option?", a: "Yes. ????????????????????." },
      { q: "How is the database scoped per tenant?", a: "Every model has a tenantId column. The auth helper enforces tenant scoping on every query." },
      { q: "Does it support webhooks?", a: "Yes — Stripe webhooks are pre-wired with signature verification, and you can extend with your own." },
    ],
  },
  {
    category: "Support",
    items: [
      { q: "How do I get help?", a: "??????????????????." },
      { q: "Do you take ????????????? requests?", a: "Yes. ?????????????????????." },
    ],
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("0-0");

  const filtered = FAQ_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter(
      (i) =>
        i.q.toLowerCase().includes(query.toLowerCase()) ||
        i.a.toLowerCase().includes(query.toLowerCase()),
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <main>
        <section className="relative overflow-hidden bg-mesh">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] text-xs font-semibold border border-[var(--brand)]/20 mb-5">
              <HelpCircle className="w-3 h-3" /> Help center
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Frequently asked <span className="text-brand-gradient">questions</span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] mt-5 max-w-2xl mx-auto">
              Everything we get asked, gathered in one place. Can&apos;t find what you need?{" "}
              <Link href="/contact" className="text-[var(--brand)] hover:underline font-semibold">
                Get in touch
              </Link>
              .
            </p>
            <div className="relative max-w-xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an answer…"
                className="!pl-11 !py-3 !text-base shadow-sm"
              />
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16 space-y-10">
          {filtered.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <p className="text-sm text-[var(--muted-fg)]">No results for &quot;{query}&quot;</p>
            </div>
          )}
          {filtered.map((g, gi) => (
            <div key={g.category}>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] mb-3">
                {g.category}
              </p>
              <div className="space-y-2">
                {g.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--muted)]/30 transition-colors"
                      >
                        <span className="font-semibold text-sm">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[var(--muted-fg)] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm text-[var(--muted-fg)] leading-relaxed border-t border-[var(--border)] pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Still have questions?</h2>
            <p className="text-sm text-[var(--muted-fg)] mt-2 max-w-md mx-auto">
              Our team typically replies within one business day. Drop us a line.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <Btn href="/contact">Contact us</Btn>
              <Btn href="/???" variant="outline">???</Btn>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
