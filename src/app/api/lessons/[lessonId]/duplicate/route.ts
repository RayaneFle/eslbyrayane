import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canEditLesson, canEditSection } from "@/lib/authz";

export async function POST(request: Request, { params }: { params: { lessonId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  if (session.user.role !== "admin" && session.user.role !== "teacher") {
    return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
  }
  const { targetSectionId } = await request.json();
  if (!targetSectionId) return NextResponse.json({ message: "Section cible requise." }, { status: 400 });

  const sourceLesson = await canEditLesson(params.lessonId, session.user.id, session.user.role);
  if (!sourceLesson) return NextResponse.json({ message: "Unauthorized on source lesson." }, { status: 403 });
  const targetSection = await canEditSection(targetSectionId, session.user.id, session.user.role);
  if (!targetSection) return NextResponse.json({ message: "Unauthorized on target section." }, { status: 403 });

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { blocks: { orderBy: { position: "asc" } } },
  });
  if (!lesson) return NextResponse.json({ message: "Not found." }, { status: 404 });
  const last = await prisma.lesson.findFirst({ where: { sectionId: targetSectionId }, orderBy: { position: "desc" } });
  const newLesson = await prisma.lesson.create({
    data: {
      title: lesson.title + " (copie)",
      content: lesson.content, type: lesson.type,
      position: (last?.position ?? -1) + 1,
      sectionId: targetSectionId,
      blocks: { create: lesson.blocks.map((b, i) => ({
        position: i, type: b.type, content: b.content,
        activityId: b.activityId, requireScore: b.requireScore, minScore: b.minScore,
      })) },
    },
  });
  return NextResponse.json(newLesson, { status: 201 });
}
