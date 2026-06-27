"use client";
import { useState } from "react";

export default function DeleteCourseInline({ courseId, canDelete, onDeleted }: { courseId: string; canDelete: boolean; onDeleted?: () => void }) {
  const [loading, setLoading] = useState(false);
  if (!canDelete) return null;
  async function handleDelete() {
    if (loading) return;
    if (!confirm("Delete this course?")) return;
    setLoading(true);
    if (onDeleted) onDeleted();
    try {
      const res = await fetch("/api/admin/courses/" + courseId, { method: "DELETE" });
      if (!res.ok) alert("Error deleting. Please reload the page.");
    } catch { alert("Network error. Please reload the page."); }
    setLoading(false);
  }
  return (
    <button onClick={handleDelete} disabled={loading} className="text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50">
      🗑 Delete
    </button>
  );
}
