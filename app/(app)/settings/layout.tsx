import { Page, PageHeader } from "@/components/ui";
import { SettingsTabs } from "./SettingsTabs";
import { requireTenant } from "@/lib/tenant-context";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  let roleSlug: string | null = null;
  try {
    const ctx = await requireTenant();
    roleSlug = ctx.roleSlug;
  } catch {
  }

  return (
    <Page>
      <PageHeader title="Settings" subtitle="Manage your account, workspace, and integrations." />
      <SettingsTabs role={roleSlug} />
      {children}
    </Page>
  );
}