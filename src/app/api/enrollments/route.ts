import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientKey } from "@/lib/ratelimit";
import { z } from "zod";

const EnrollSchema = z.object({
  courseId: z.string().min(1, "courseId requis.").max(100),
  enrollmentCode: z.string().max(50).optional().nullable(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const key = getClientKey(request, "enroll:" + session.user.id);
  if (rateLimit(key, { windowMs: 15 * 60 * 1000, max: 10 })) {
    return NextResponse.json({ message: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const body = await request.json();
  const parsed = EnrollSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "Invalid data." }, { status: 400 });
  }
  const { courseId, enrollmentCode } = parsed.data;
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return NextResponse.json({ message: "Course not found." }, { status: 404 });
  if (course.requiresEnrollment && course.enrollmentCode !== enrollmentCode) {
    return NextResponse.json({ message: "Incorrect enrollment code." }, { status: 403 });
  }
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });
  if (existing) return NextResponse.json({ message: "Already enrolled." }, { status: 409 });
  await prisma.enrollment.create({ data: { userId: session.user.id, courseId } });
  return NextResponse.json({ success: true }, { status: 201 });
}
