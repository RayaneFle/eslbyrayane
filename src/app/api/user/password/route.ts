import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const PasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password required.").max(200),
  newPassword: z.string().min(8, "Minimum 8 characters.").max(200, "Password too long."),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    const body = await request.json();
    const parsed = PasswordSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message || "Invalid data.";
      return NextResponse.json({ message }, { status: 400 });
    }
    const { currentPassword, newPassword } = parsed.data;

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.hashedPassword) return NextResponse.json({ message: "Error." }, { status: 400 });

    const valid = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!valid) return NextResponse.json({ message: "Incorrect current password." }, { status: 403 });

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: session.user.id }, data: { hashedPassword: hashed } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
