"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Btn, Field, Input } from "@/components/ui";
import { toast } from "@/lib/toast";

interface Props {
  initial: { name: string; email: string; locale: string };
}

export function AccountForm({ initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [saving, setSaving] = useState(false);

  const emailChanged = email.trim().toLowerCase() !== initial.email.trim().toLowerCase();
  const dirty = name !== initial.name || emailChanged;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body: Record<string, string> = { name };
      if (emailChanged) body.email = email.trim().toLowerCase();

      const res = await fetch("/api/settings/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error?.message ?? "Failed to save.");
        return;
      }

      if (emailChanged) {
        toast.success("Verification email sent. Check your inbox to confirm the new address.");
        setEmail(initial.email);
      } else {
        toast.success("Saved");
      }

      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field
        label="Email"
        hint={
          emailChanged
            ? "A verification link will be sent to the new address. Your current email stays active until confirmed."
            : undefined
        }
        required
      >
        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className={emailChanged ? "pr-9 border-amber-400 focus:ring-amber-400" : ""}
          />
          {emailChanged && (
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
          )}
        </div>
      </Field>

      <Field label="Name" required>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Field>

      <div className="flex justify-end">
        <Btn type="submit" loading={saving} disabled={!dirty}>
          Save
        </Btn>
      </div>
    </form>
  );
}