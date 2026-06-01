import Link from "next/link";
import { Sparkles, Globe, Shield, CreditCard } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex w-1/2 max-w-2xl relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="relative flex flex-col p-12 w-full">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            Project Test
          </Link>

          <div className="flex-1 flex flex-col justify-center py-16">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Test your Project<br />
              <span className="text-brand-gradient">Test.</span>
            </h1>
            <p className="text-[var(--muted-fg)] mt-4 max-w-md">
              Multi-tenant. RBAC. Stripe billing. Magic-link auth. Audit log. Real-time SSE.
              All wired up. All yours.
            </p>
          </div>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
              <span className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </span>
              Project
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

function Bullet({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 h-8 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--brand)] shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <span className="text-sm">{text}</span>
    </div>
  );
}
