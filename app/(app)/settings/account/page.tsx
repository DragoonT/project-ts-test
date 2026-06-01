import { Mail, Shield, KeyRound } from "lucide-react";
import { requireUser } from "@/lib/auth-server";
import { Card } from "@/components/ui";
import { Avatar } from "@/components/ui/Avatar";
import { AccountForm } from "./AccountForm";
import { PasswordForm } from "./PasswordForm";

export default async function AccountSettingsPage() {
  const user = await requireUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <aside className="space-y-4 md:order-2">
        <Card>
          <div className="flex flex-col items-center text-center">
            <Avatar name={user.name ?? user.email} size="xl" />
            <p className="font-bold mt-3">{user.name ?? user.email.split("@")[0]}</p>
            <p className="text-xs text-[var(--muted-fg)] mt-0.5 truncate w-full">{user.email}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2 text-xs">
            <Row icon={Mail} label="Email" value={user.email} />
          </div>
        </Card>
      </aside>

      <div className="md:col-span-2 space-y-6 md:order-1">
        <Card>
          <h2 className="font-bold mb-1">Profile</h2>
          <p className="text-xs text-[var(--muted-fg)] mb-4">Update your display name and preferences.</p>
          <AccountForm
            initial={{ name: user.name ?? "", email: user.email, locale: user.locale }}
          />
        </Card>

        <Card>
          <h2 className="font-bold mb-1">Password</h2>
          <p className="text-xs text-[var(--muted-fg)] mb-4">
            Changing your password will sign you out of every other session.
          </p>
          <PasswordForm />
        </Card>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--muted-fg)]">
      <Icon className="w-3 h-3" />
      <span className="font-medium">{label}</span>
      <span className="ml-auto text-[var(--foreground)] truncate">{value}</span>
    </div>
  );
}
