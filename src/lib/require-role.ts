import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";

export async function requireRole(allowed: string[]) {
  const session = await requireSession();

  const membership = await prisma.membership.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      role: true,
    },
  });

  if (!membership) {
    redirect("/auth/sign-in");
  }

  if (!allowed.includes(membership.role.slug)) {
    redirect("/dashboard");
  }

  return membership;
}