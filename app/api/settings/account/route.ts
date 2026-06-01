import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { withApi, apiResponse } from "@/lib/api-middleware";
import { requireUser } from "@/lib/auth-server";
import { badRequest, unauthorized } from "@/lib/api-error";
import crypto from "crypto";

const patchSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().max(200).optional(),
});

export const PATCH = withApi(async (req: NextRequest) => {
  const user = await requireUser();
  const body = patchSchema.parse(await req.json());

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;

  if (body.email !== undefined && body.email.toLowerCase() !== user.email.toLowerCase()) {
    const existing = await prisma.user.findUnique({ where: { email: body.email.toLowerCase() } });
    if (existing) throw badRequest("email_taken");

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: user.id,
        token,
        purpose: "email_change",
        expiresAt: expiry,
      },
    });

    await prisma.verificationToken.deleteMany({
      where: { identifier: user.id, purpose: "email_change", token },
    });
    await prisma.verificationToken.create({
      data: {
        identifier: `${user.id}|${body.email.toLowerCase()}`,
        token,
        purpose: "email_change",
        expiresAt: expiry,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.tjrone.com";
    const verifyUrl = `${appUrl}/verify-email?token=${token}`;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({ where: { id: user.id }, data: updateData });
    }

    return apiResponse({ pendingEmail: body.email.toLowerCase() });
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.user.update({ where: { id: user.id }, data: updateData });
  }

  return apiResponse({ ok: true });
});

const postSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(200),
});

export const POST = withApi(async (req: NextRequest) => {
  const user = await requireUser();
  const body = postSchema.parse(await req.json());

  const fullUser = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { password: true },
  });

  if (!fullUser.password) throw unauthorized("no_password_set");

  const valid = await bcrypt.compare(body.currentPassword, fullUser.password);
  if (!valid) throw unauthorized("wrong_password");

  const hashed = await bcrypt.hash(body.newPassword, 12);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  return apiResponse({ ok: true });
});