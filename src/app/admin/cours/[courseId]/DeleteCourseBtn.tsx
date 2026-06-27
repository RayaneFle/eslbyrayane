"use client";
import { useRouter } from "next/navigation";
export default function DeleteCourseBtn({ courseId }: { courseId: string }) {
  const router = useRouter();
  return <button onClick={async () => { if (!confirm("Delete this course and all its content?")) return; await fetch(`/api/admin/courses/${courseId}`, { method:"DELETE" }); router.push("/admin/cours"); router.refresh(); }} className="text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 bg-red-50 rounded-xl hover:bg-red-100">🗑 Delete</button>;
}
