import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  name: z.string().trim().min(1, "Name required.").max(100, "Name too long."),
  email: z.string().trim().toLowerCase().email("Invalid email.").max(200),
});

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = UpdateProfileSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message || "Invalid data.";
      return NextResponse.json({ message }, { status: 400 });
    }
    const { name, email } = parsed.data;

    // Vérifier que l'email n'est pas déjà pris par un autre utilisateur
    if (email !== session.user.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== session.user.id) {
        return NextResponse.json({ message: "Email already in use." }, { status: 409 });
      }
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error("Update profile error:", e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
