"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Btn, Field, Input } from "@/components/ui";
import { toast } from "@/lib/toast";

export function PasswordForm() {
  const router = useRouter();
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirm) {
      toast.error("passwords_do_not_match");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/settings/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error?.code ?? "save_failed");
        return;
      }
      toast.success("Password updated. Other sessions signed out.");
      setCurrent(""); setNew(""); setConfirm("");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Current password" required>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrent(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="!pl-9"
          />
        </div>
      </Field>

      <Field label="New password" hint="Minimum 8 characters." required>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="!pl-9"
          />
        </div>
      </Field>

      <Field label="Confirm new password" required>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="!pl-9"
          />
        </div>
      </Field>

      <div className="flex justify-end">
        <Btn type="submit" loading={saving}>
          Change password
        </Btn>
      </div>
    </form>
  );
}